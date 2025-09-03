import React from "react";

const AdminSidebar = ({ currentPage, setPage }) => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 text-white grid place-items-center text-sm font-bold shadow">AD</div>
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>

      <ul className="space-y-2">
        <li>
          <button
            aria-current={currentPage === 'add' ? 'page' : undefined}
            className={`${currentPage === 'add' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-gray-700 hover:bg-gray-50'} w-full px-4 py-2 rounded-md flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
            onClick={() => setPage('add')}
          >
            <span>➕</span>
            <span>Add Item</span>
          </button>
        </li>
        <li>
          <button
            aria-current={currentPage === 'list' ? 'page' : undefined}
            className={`${currentPage === 'list' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-gray-700 hover:bg-gray-50'} w-full px-4 py-2 rounded-md flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
            onClick={() => setPage('list')}
          >
            <span>📋</span>
            <span>Food List</span>
          </button>
        </li>
        <li>
          <button
            aria-current={currentPage === 'orders' ? 'page' : undefined}
            className={`${currentPage === 'orders' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-gray-700 hover:bg-gray-50'} w-full px-4 py-2 rounded-md flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
            onClick={() => setPage('orders')}
          >
            <span>📦</span>
            <span>Order History</span>
          </button>
        </li>
      </ul>

      <div className="mt-auto pt-6 text-xs text-gray-400">© {new Date().getFullYear()} Admin</div>
    </aside>
  );
};

export default AdminSidebar;
