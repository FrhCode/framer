export default function idrCurrenyFormat(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    unitDisplay: "short",
  })
    .format(number)
    .replace(",00", "");
}
