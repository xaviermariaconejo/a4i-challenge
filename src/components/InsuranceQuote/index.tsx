import { type FC } from "react";

import { useInsurance } from "../../context/Insurance/hook";

export const InsuranceQuote: FC = () => {
  const { insurance } = useInsurance();

  if (!insurance) return "Loading...";

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Insurance Quote Result
      </h2>
      <ul className="space-y-2 text-gray-900 dark:text-gray-100">
        <li>
          <strong>Name:</strong> {insurance.name}
        </li>
        <li>
          <strong>Age:</strong> {insurance.age}
        </li>
        <li>
          <strong>Has accidents:</strong>{" "}
          {insurance.hasAccidents ? "Yes" : "No"}
        </li>
        <li>
          <strong>Quote:</strong> {insurance.quote} {insurance.currency}
        </li>
      </ul>
    </div>
  );
};
