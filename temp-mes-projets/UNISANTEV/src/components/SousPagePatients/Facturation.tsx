"use client";

import React, { useState } from "react";

interface Invoice {
  invoiceNumber: string;
  doctorName: string;
  date: string;
  tax: number;
  discount: number;
  total: number;
}

const Facturation: React.FC = () => {
  const invoices: Invoice[] = [
    {
      invoiceNumber: "#A348",
      doctorName: "Fatou Badji",
      date: "04/03/2016",
      tax: 10,
      discount: 3000,
      total: 23400,
    },
    {
      invoiceNumber: "#A645",
      doctorName: "Abdou Diallo",
      date: "11/04/2016",
      tax: 10,
      discount: 1500,
      total: 13200,
    },
    {
      invoiceNumber: "#A873",
      doctorName: "Mariama Kane",
      date: "18/04/2016",
      tax: 10,
      discount: 3000,
      total: 28200,
    },
  ];

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(amount);
  };

  const handleCloudAction = (invoice: Invoice) => {
    console.log(`Téléchargement de la facture ${invoice.invoiceNumber} vers le cloud`);
    const content = `
      Numéro de facture: ${invoice.invoiceNumber}
      Médecin: ${invoice.doctorName}
      Date: ${invoice.date}
      Taxe: ${invoice.tax}%
      Rabais: ${formatCurrency(invoice.discount)}
      Total: ${formatCurrency(invoice.total)}
    `;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Facture_${invoice.invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewAction = (invoice: Invoice) => {
    console.log(`Affichage des détails de la facture ${invoice.invoiceNumber}`);
    setSelectedInvoice(invoice);
  };

  const handlePrintAction = (invoiceNumber: string) => {
    console.log(`Impression de la facture ${invoiceNumber}`);
    window.print();
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        Facturation
        <span className="ml-2 text-green-600 cursor-pointer hover:text-green-800 transition-colors"></span>
      </h2>

      <div className="text-gray-600 dark:text-gray-300 font-medium mb-4"></div>

      <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-green-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-left text-sm uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">N° de facture</th>
                <th className="py-3 px-4 font-semibold">Nom du médecin</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Taxe</th>
                <th className="py-3 px-4 font-semibold">Rabais</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {invoices.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                  <td className="py-3 px-4">{invoice.doctorName}</td>
                  <td className="py-3 px-4">{invoice.date}</td>
                  <td className="py-3 px-4">{invoice.tax}%</td>
                  <td className="py-3 px-4">{formatCurrency(invoice.discount)}</td>
                  <td className="py-3 px-4 font-medium">{formatCurrency(invoice.total)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleCloudAction(invoice)}
                        className="text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transform hover:scale-110 transition-all"
                        title="Télécharger vers le cloud"
                        aria-label="Upload to cloud"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-10A7 7 0 004 9a4 4 0 00-1 6z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 12v4m0 0l-2-2m2 2l2-2"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleViewAction(invoice)}
                        className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transform hover:scale-110 transition-all"
                        title="Voir les détails"
                        aria-label="View details"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handlePrintAction(invoice.invoiceNumber)}
                        className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transform hover:scale-110 transition-all"
                        title="Imprimer"
                        aria-label="Print invoice"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale pour afficher les détails */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Détails de la Facture</h3>
            <p><strong>Numéro de facture :</strong> {selectedInvoice.invoiceNumber}</p>
            <p><strong>Médecin :</strong> {selectedInvoice.doctorName}</p>
            <p><strong>Date :</strong> {selectedInvoice.date}</p>
            <p><strong>Taxe :</strong> {selectedInvoice.tax}%</p>
            <p><strong>Rabais :</strong> {formatCurrency(selectedInvoice.discount)}</p>
            <p><strong>Total :</strong> {formatCurrency(selectedInvoice.total)}</p>
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Facturation;