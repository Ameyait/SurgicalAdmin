import SectionTitle from "./SectionTitle";

export default function ProductsSection({
    items = [],
    formatCurrency,
}) {
    return (
        <>
            <SectionTitle title="Products" />

            <div className="space-y-3 mb-10">
                {items.map((item, index) => (
                    <div
                        key={`${item.product_id}-${index}`}
                        className="bg-white border border-slate-200 rounded-3xl px-5 py-4 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-semibold text-[14px]">
                                {
                                    item.product_name
                                }
                            </h4>

                            <p className="text-slate-500 text-sm">
                                Qty{" "}
                                {
                                    item.quantity
                                }{" "}
                                ×{" "}
                                {formatCurrency(
                                    item.price
                                )}
                            </p>
                        </div>

                        <div className="font-semibold">
                            {formatCurrency(
                                item.total
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}