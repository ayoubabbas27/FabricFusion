import { formatCurrency, formatDate } from "@/lib/formatters";
import { Order, Product } from "@prisma/client";
import { 
    Preview, 
    Html, 
    Tailwind, 
    Head,
    Body,
    Container, 
    Heading,
    Section,
    Row,
    Column,
    Text,
    Img
} from "@react-email/components";
import * as React from "react";


const orderTest = {
    id: '1111',
    createdAt: new Date(),
    pricePaidInCents: 15000
}



export default function PurchaseReceipt({ order, product }:{ order: Order, product: Product }) {
  return (
    <Html>
      <Preview>Thank You For Purchasing product.name from Fabric Fusion</Preview>
      <Tailwind>
        <Head>

        </Head>
        <Body className="font-sans bg-white">
            <Container className="max-w-xl">
                <Heading>Purchase Receipt</Heading>
                <Section>
                    <Row>
                        <Column>
                            <Text className="font-semibold mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Order ID : </Text>
                            <Text className="mt-0 mr-4">{order.id}</Text>
                        </Column>
                        <Column>
                            <Text className="font-semibold mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Purchased On : </Text>
                            <Text className="mt-0 mr-4">{formatDate(order.createdAt.toString())}</Text>
                        </Column>
                        <Column>
                            <Text className="font-semibold mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Price Paid : </Text>
                            <Text className="mt-0 mr-4">{formatCurrency(order.pricePaidInCents/100)}</Text>
                        </Column>
                    </Row>
                </Section>
                <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
                    <Img 
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
                        width="100%"
                        alt={product.name}
                    />
                    <Row className="mt-8">
                        <Column className="align-bottom">
                            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
                        </Column>
                    </Row>
                </Section>
            </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
