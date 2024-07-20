const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0
});

export function formatCurrency(amount: number): string {
    return CURRENCY_FORMATTER.format(amount);
};

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber (number: number): string {
    return NUMBER_FORMATTER.format(number);
};

export function formatDate(rawDate: string): string{
    let [month, day, year] = rawDate.split(' ').splice(1,4);
    return `${day}-${month}-${year}`;
}
