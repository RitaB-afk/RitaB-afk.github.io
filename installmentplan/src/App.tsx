import React, { useState } from 'react';
import './App.css';
import InstallmentDisplay from './InstallmentDisplay';
import { PaymentDetails } from './interfaces';
import { SubmitHandler, useForm } from "react-hook-form";

function App() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    principal: 100000,
    periods: 24,
    interest: 5,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentDetails>();
  const onSubmit: SubmitHandler<PaymentDetails> = (data) => setPaymentDetails(data);

  return (
    <div className="App">
      <h1>Installment Plan Calculator</h1>
      <p>Please enter your payment details:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label>Principal Amount</label>
        <input
          id="principalinput"
          type="number"
          min="1"
          defaultValue={paymentDetails.principal}
          {...register("principal", {min: 1, required: true })}
        ></input>
        {errors.principal && <span>This field is required, and cannot be left empty.</span>}
         <label>Number of Periods</label>
        <input
          id="numberofperiodsinput"
          type="number"
          defaultValue={paymentDetails.periods}
          min="1"
          {...register("periods", { min: 1, required: true })}
        ></input>
         {errors.periods && <span>This field is required, and cannot be left empty.</span>}
        <label>Interest</label>
        <input
          id="interestratepercentageinput"
          type="number"
          min="0"
          defaultValue={paymentDetails.interest}
          {...register("interest", { min: 0, required: true })}
        ></input>
        {errors.interest && <span>This field is required, and cannot be left empty.</span>}

        <button type="submit">Calculate</button>
      </form>

      <h3>Installment Plan</h3>
      <InstallmentDisplay paymentDetails={paymentDetails}></InstallmentDisplay>
    </div>
  );
}

export default App;
