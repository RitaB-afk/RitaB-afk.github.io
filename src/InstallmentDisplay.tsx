import { PaymentDetails, InstallementPlan } from "./interfaces";

interface InstallementPlanProps {
  paymentDetails?: PaymentDetails;
}

export const InstallmentDisplay = ({
  paymentDetails,
}: InstallementPlanProps) => {
  const startDate = new Date();

  const transformingDate = (arr: any) => {
    arr.forEach((element: any) => {
      const dateex =
        element.paymentDate && ("0" + element.paymentDate?.getDate()).slice(-2);
      const monthex =
        element.paymentDate &&
        ("0" + (element.paymentDate.getMonth() + 1)).slice(-2);
      const yearex = element.paymentDate && element.paymentDate.getFullYear();
      const updatedDate = dateex + "-" + monthex + "-" + yearex;
      element.paymentDate = updatedDate;
    });
    return arr;
  };

  const CalculatingInstallmentPlan = (details: PaymentDetails) => {
    
    const monthlyInterestRate = details.interest / 12 / 100;
    const monthlyPaymentZeroRate = (details.principal / details.periods);
 
    const monthlyPayment =
      monthlyInterestRate > 0 ? (details.principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -details.periods)): monthlyPaymentZeroRate;
    let schedule: InstallementPlan[] = [];
    let remainingBalance = details.principal;
    for (let i = 1; i <= details.periods; i++) {
      let interestPayment = remainingBalance * monthlyInterestRate;
      let principalPayment = monthlyPayment - interestPayment;
      let paymentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i,
        1
      );
      remainingBalance -= principalPayment;

      schedule.push({
        period: i,
        paymentDate: paymentDate,
        totalPayment: monthlyPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
      });
    }
    transformingDate(schedule);
    return schedule;
  };
  const arr = paymentDetails && CalculatingInstallmentPlan(paymentDetails);

  return (
    <table>
      <thead>
        <tr>
          <th>Period</th>
          <th>Payment Date</th>
          <th>Total Payment</th>
          <th>Principal payment</th>
          <th>Cumulative interest</th>
          <th>Outstanding balance</th>
        </tr>
      </thead>
      <tbody>
        {arr?.map((payment, index) => (
          <tr key={index}>
            <td className="nonNumeric">{payment.period}</td>
            <td className="nonNumeric">
              {payment.paymentDate.toLocaleString()}
            </td>
            <td className="numeric">{payment.totalPayment}</td>
            <td className="numeric">{payment.principalPayment}</td>
            <td className="numeric">{payment.interestPayment}</td>
            <td className="numeric">{payment.remainingBalance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InstallmentDisplay;
