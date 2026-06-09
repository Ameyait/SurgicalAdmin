import SectionTitle from "./SectionTitle";

export default function PricingSection({
    pricing,
    formatCurrency,
}) {
    return (
        <>
            <SectionTitle title="Pricing" />

            <div className="bg-white rounded-3xl border border-slate-200 p-5 mb-5 space-y-2 text-[12px]">
                <div className="flex justify-between">
                    <span>
                        Subtotal
                    </span>

                    <span>
                        {formatCurrency(
                            pricing?.subtotal
                        )}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>
                        Shipping
                    </span>

                    <span>
                        {formatCurrency(
                            pricing?.shipping
                        )}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>GST</span>

                    <span>
                        {formatCurrency(
                            pricing?.gst
                        )}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>
                        Discount
                    </span>

                    <span>
                        -
                        {formatCurrency(
                            pricing?.discount
                        )}
                    </span>
                </div>

                <hr />

                <div className="flex justify-between font-bold">
                    <span>Total</span>

                    <span>
                        {formatCurrency(
                            pricing?.total
                        )}
                    </span>
                </div>
            </div>
        </>
    );
}