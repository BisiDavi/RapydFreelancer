export default function RadioGroup({}) {
  return (
    <div className="input-group">
      <div className="radio">
        <input type="radio" placeholder="USD" name="currencyType" /> USD
      </div>
      <div className="radio">
        <input type="radio" name="currencyType" /> Local Currency
      </div>
    </div>
  );
}
