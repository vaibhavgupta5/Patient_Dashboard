import { Trash, FileText, Download } from "lucide-react";

const ReportView = () => {
  const reportsData = [
    {
      id: 1,
      title: "Reports 1 clinical documentation",
      date: "May-28, 2024",
    },
    {
      id: 2,
      title: "Reports 2 random files documentation",
      date: "Mar-20, 2024",
    },
    {
      id: 3,
      title: "Reports 3 glucose level complete report",
      date: "Feb-18, 2024",
    },
  ];

  const handleDelete = (id: number) => {
    console.log(`Delete report with ID: ${id}`);
  };

  const handleDownload = (id: number) => {
    console.log(`Download report with ID: ${id}`);
  };

  return (
    <div className="max-w-4xl text-black mx-auto bg-white  rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Reports</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">#</th>
            <th className="border border-gray-200 px-4 py-2 text-left">File</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Reports Link</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report, index) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded">
                  <FileText className="text-white" size={20} />
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-blue-600">
                {report.title}
              </td>
              <td className="border border-gray-200 px-4 py-2">{report.date}</td>
              <td className="border border-gray-200 px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleDelete(report.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                >
                  <Trash size={16} />
                </button>
                <button
                  onClick={() => handleDownload(report.id)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                >
                  <Download size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportView;
