import SectionTitle from "./SectionTitle";

export default function ShippingAddressSection({
    address,
}) {
    return (
        <div className="mb-10">
            <SectionTitle title="Shipping Address" />

            <div className="space-y-2 text-[13px] text-slate-700">
                <p>
                    {address?.full_name ||
                        "-"}
                </p>

                <p>
                    {address?.phone || "-"}
                </p>

                <p>
                    {address?.address ||
                        "-"}
                </p>

                <p>
                    {address?.city},{" "}
                    {address?.state}
                </p>

                <p>
                    {address?.pincode}
                </p>
            </div>
        </div>
    );
}