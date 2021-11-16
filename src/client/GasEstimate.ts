const DEFAULT_FEE_ADJUSTMENT = 1.25;
const DEFAULT_GAS_PRICE = 1905.00;

export class GasEstimate {

    constructor(estimate: number, feeAdjustment?: number) {
        this.estimate = estimate;
        this.feeAdjustment = feeAdjustment;

        if (typeof this.feeAdjustment !== 'undefined') {
            this.adjustment = this.feeAdjustment;
        }

        this.limit = Math.ceil(this.estimate * this.adjustment);
        this.fees = Math.ceil(this.limit * DEFAULT_GAS_PRICE);
    }

    public estimate: number;
    public feeAdjustment?: number = DEFAULT_FEE_ADJUSTMENT;
    public limit: number;
    public fees: number;

    private adjustment: number = DEFAULT_FEE_ADJUSTMENT;

}
