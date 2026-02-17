interface Mortgage {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    property_price: number;
    down_payment: number;
    loan_term_years: number;
    annual_income: number;
    credit_score: number;
    employment_type: string;
    interest_type: string;
}

export default Mortgage;