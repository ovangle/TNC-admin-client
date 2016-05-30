
export const enum ProofOfLowIncome {
    NoProofSighted = 0,
    PensionersConcessionCard = 1 << 0,
    LowIncomeHealthCareCard = 1 << 1
}

export function isPensionerConcessionCardSighted(flags: number): boolean {
    return (flags & ProofOfLowIncome.PensionersConcessionCard) === ProofOfLowIncome.PensionersConcessionCard;
}

export function setPensionerConcessionCardSighted(flags: number, value: boolean): number {
    if (value) {
        return flags | ProofOfLowIncome.PensionersConcessionCard;
    } else {
        return flags & ~ProofOfLowIncome.PensionersConcessionCard;
    }
}

export function isLowIncomeHealthCareCardSighted(flags: number): boolean {
    return (flags & ProofOfLowIncome.LowIncomeHealthCareCard) === ProofOfLowIncome.LowIncomeHealthCareCard;
}

export function setLowIncomeHealthCareCardSighted(flags: number, value: boolean): number {
    if (value) {
        return flags | ProofOfLowIncome.LowIncomeHealthCareCard;
    } else {
        return flags & ~ProofOfLowIncome.LowIncomeHealthCareCard;
    }
}

export function noProofSighted(flags: number): boolean {
    return flags === ProofOfLowIncome.NoProofSighted;
}

export function setNoProofSighted(flags: number): number {
    return ProofOfLowIncome.NoProofSighted;
}

