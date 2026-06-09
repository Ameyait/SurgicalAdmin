import SectionTitle from "./SectionTitle";

export default function ProductsSection({
    items = [],
    formatCurrency,
}) {
    return (
        <>
            <SectionTitle title="Products" />

            <div className="space-y-3 mb-5">
                {items.map((item, index) => (
                    <div
                        key={`${item.product_id}-${index}`}
                        className="bg-white border border-slate-200 rounded-xl px-3 py-3 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-semibold text-[12px]">
                                {
                                    item.product_name
                                }
                            </h4>

                            <p className="text-slate-500 text-[10px]">
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

                        <div className="font-semibold text-[12px]">
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