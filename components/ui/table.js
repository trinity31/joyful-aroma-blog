import React from "react";
import { useTranslation } from "next-i18next";

const Table = ({ symptoms }) => {
  const { t } = useTranslation("common");

  return (
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("symptom")}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {t("oils")}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {symptoms.map((symptom) => (
          <tr key={symptom.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {symptom.name}
            </td>
            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
              {symptom.oils.map((oil) => (
                <span
                  key={oil.id}
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {oil.name}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
