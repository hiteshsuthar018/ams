export default function AdminDashboard() {

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <a
          href="/admin/trainees"
          className="border p-6 rounded-lg"
        >
          Manage Trainees
        </a>

        <a
          href="/admin/attendance"
          className="border p-6 rounded-lg"
        >
          View Attendance
        </a>

      </div>

    </div>
  )
}