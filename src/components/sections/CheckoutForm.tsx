"use client"
import { formatCurrency } from "@/lib/formatters";
import { AddressElement, Elements, LinkAuthenticationElement, PaymentElement, ShippingAddressElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function CheckoutForm ({ 
    product, 
    clientSecret
}: {
    product: {
        name: string,
        imagePath: string,
        priceInCents: number,
        description: string
    },
    clientSecret: string
}) {
    return (
        <div className='mt-6 max-w-5xl w-full mx-auto space-y-8 mb-28'>
            <div className="flex gap-4 items-center">
                <div className="aspect-square flex-shrink-0 w-1/3 relative">
                    <Image 
                        src={product.imagePath}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div>
                    <div className="text-lg font-bold">
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div className="line-clamp-3 text-muted-foreground">
                        {product.description}
                    </div>
                </div>
            </div>
            <Elements options={{ clientSecret }}  stripe={stripePromise}>
                <Form priceInCents={product.priceInCents/100}/>
            </Elements>
        </div>
    )
}

function Form({ priceInCents }: { priceInCents: number}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit (e: FormEvent){
        e.preventDefault();

        if (stripe == null || elements == null) return 

        setIsLoading(true);

        stripe.confirmPayment({ elements, confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
            }
        }).then(({ error }) => {
            if (error.type === "card_error" || error.type === "validation_error") {
                setErrorMessage(error.message as string)
            }else{
                setErrorMessage(`An Unknown Error Occurred : ${error.message}`)
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card >
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {errorMessage && <CardDescription className="text-destructive">
                        {errorMessage}
                    </CardDescription>}
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                    <div className="mt-5">
                        <LinkAuthenticationElement />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="w-full" 
                        size="lg"
                        disabled={stripe == null || elements == null || isLoading}
                    >
                        {isLoading ? 'Purchasing...':`Purchase - ${formatCurrency(priceInCents)}`}
                    </Button>
                </CardFooter>
            </Card>
        </form>
        
    )
}