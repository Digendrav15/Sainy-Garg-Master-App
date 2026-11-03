import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Lock, 
  Search, 
  Table as TableIcon, 
  Phone, 
  Mail, 
  Settings as SettingsIcon,
  Layers,
  ArrowRightCircle,
  AlertTriangle,
  UserCheck,
  Building2,
  Truck,
  Scissors,
  PlusCircle,
  Tag,
  Star,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Sliders
} from 'lucide-react';
import { STAGES } from '../types/stages';
import { 
  getStoredCustomers, 
  saveCustomersToStorage,
  getStoredVendors,
  saveVendorsToStorage,
  getStoredTransporters,
  saveTransportersToStorage,
  getStoredKarigars,
  saveKarigarsToStorage
} from '../utils/masterStorage';
import { MasterEntryModal } from './MasterEntryModal';
import { maskCustomerMobile } from '../utils/privacy';

export const UserManagementView = ({
  users = [],
  activeUserId,
  currentUser,
  onSwitchUser,
  onOpenAddUser,
  onOpenEditUser,
  onDeleteUser
}) => {
  // Main Tab: 'staff' vs 'masters'
  const [activeMainTab, setActiveMainTab] = useState('staff'); // 'staff' | 'masters'

  // Masters Sub-tab: 'customers' | 'vendors' | 'transporters' | 'karigars'
  const [masterSubTab, setMasterSubTab] = useState('customers');

  // Search Terms
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Master Data States (Loaded from LocalStorage with realistic initial data)
  const [customers, setCustomers] = useState(() => getStoredCustomers());
  const [vendors, setVendors] = useState(() => getStoredVendors());
  const [transporters, setTransporters] = useState(() => getStoredTransporters());
  const [karigars, setKarigars] = useState(() => getStoredKarigars());

  // Master Modal State
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [editingMasterItem, setEditingMasterItem] = useState(null);
  const [masterModalType, setMasterModalType] = useState('customer');

  // --- Filtered Staff ---
  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.phone && u.phone.includes(searchTerm)) ||
    (u.email && u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- Filtered Customers ---
  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm) ||
    c.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Filtered Vendors ---
  const filteredVendors = vendors.filter((v) =>
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.phone?.includes(searchTerm) ||
    v.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Filtered Transporters ---
  const filteredTransporters = transporters.filter((t) =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone?.includes(searchTerm) ||
    t.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.operatingRoutes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Filtered Karigars ---
  const filteredKarigars = karigars.filter((k) =>
    k.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.unit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.phone?.includes(searchTerm) ||
    k.skillGrade?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Modal for Add
  const handleOpenAddMaster = (type) => {
    setMasterModalType(type);
    setEditingMasterItem(null);
    setIsMasterModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditMaster = (type, item) => {
    setMasterModalType(type);
    setEditingMasterItem(item);
    setIsMasterModalOpen(true);
  };

  // Submit Master (Create or Update)
  const handleSubmitMaster = (itemData) => {
    if (masterModalType === 'customer') {
      const exists = customers.some(c => c.id === itemData.id);
      let updated;
      if (exists) {
        updated = customers.map(c => c.id === itemData.id ? itemData : c);
      } else {
        updated = [itemData, ...customers];
      }
      setCustomers(updated);
      saveCustomersToStorage(updated);
    } else if (masterModalType === 'vendor') {
      const exists = vendors.some(v => v.id === itemData.id);
      let updated;
      if (exists) {
        updated = vendors.map(v => v.id === itemData.id ? itemData : v);
      } else {
        updated = [itemData, ...vendors];
      }
      setVendors(updated);
      saveVendorsToStorage(updated);
    } else if (masterModalType === 'transporter') {
      const exists = transporters.some(t => t.id === itemData.id);
      let updated;
      if (exists) {
        updated = transporters.map(t => t.id === itemData.id ? itemData : t);
      } else {
        updated = [itemData, ...transporters];
      }
      setTransporters(updated);
      saveTransportersToStorage(updated);
    } else if (masterModalType === 'karigar') {
      const exists = karigars.some(k => k.id === itemData.id);
      let updated;
      if (exists) {
        updated = karigars.map(k => k.id === itemData.id ? itemData : k);
      } else {
        updated = [itemData, ...karigars];
      }
      setKarigars(updated);
      saveKarigarsToStorage(updated);
    }
  };

  // Delete Master Entry
  const handleDeleteMaster = (type, id) => {
    if (type === 'customer') {
      const updated = customers.filter(c => c.id !== id);
      setCustomers(updated);
      saveCustomersToStorage(updated);
    } else if (type === 'vendor') {
      const updated = vendors.filter(v => v.id !== id);
      setVendors(updated);
      saveVendorsToStorage(updated);
    } else if (type === 'transporter') {
      const updated = transporters.filter(t => t.id !== id);
      setTransporters(updated);
      saveTransportersToStorage(updated);
    } else if (type === 'karigar') {
      const updated = karigars.filter(k => k.id !== id);
      setKarigars(updated);
      saveKarigarsToStorage(updated);
    }
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner - Setting & Masters Page */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#431021]">
              Setting & Master Data
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF5EE] text-[#9B783E] border border-[#DECDB8] font-bold">
              Atelier Control Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage staff accounts, page access permissions, and centralized masters (Customers, Vendors, Transporters, Karigars).
          </p>
        </div>

        {/* Quick Action Button according to active tab */}
        {activeMainTab === 'staff' ? (
          <button
            onClick={onOpenAddUser}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#5B172E] hover:bg-[#431021] shadow-xs transition-all shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Staff Member</span>
          </button>
        ) : (
          <button
            onClick={() => handleOpenAddMaster(
              masterSubTab === 'customers' ? 'customer' :
              masterSubTab === 'vendors' ? 'vendor' :
              masterSubTab === 'transporters' ? 'transporter' : 'karigar'
            )}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#5B172E] to-[#781F3E] hover:from-[#431021] hover:to-[#5B172E] shadow-xs transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-[#F3ECE2]" />
            <span>
              {masterSubTab === 'customers' ? '+ Add New Customer' :
               masterSubTab === 'vendors' ? '+ Add New Vendor' :
               masterSubTab === 'transporters' ? '+ Add New Transporter' : '+ Add New Karigar'}
            </span>
          </button>
        )}
      </div>

      {/* PRIMARY NAVIGATION TABS (STAFF & ACCESS vs MASTER HUB - AS REQUESTED) */}
      <div className="flex items-center space-x-2 border-b border-[#E8DFD3] pb-1">
        <button
          onClick={() => {
            setActiveMainTab('staff');
            setSearchTerm('');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMainTab === 'staff'
              ? 'bg-[#5B172E] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-[#DECDB8]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff & Page Access ({users.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveMainTab('masters');
            setSearchTerm('');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMainTab === 'masters'
              ? 'bg-[#5B172E] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-[#DECDB8]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#C5A059]" />
          <span>Master Hub (Customers, Vendors, Transporters, Karigars)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: STAFF & PAGE ACCESS (USER CREDENTIALS & PERMISSIONS)          */}
      {/* ===================================================================== */}
      {activeMainTab === 'staff' && (
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DFD3] shadow-xs flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search staff by name, username, role or phone..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DECDB8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30 text-stone-800"
              />
            </div>

            <div className="text-xs text-stone-500">
              Total Accounts: <strong className="text-[#5B172E]">{filteredUsers.length}</strong>
            </div>
          </div>

          {/* STAFF TABLE: 1ST COLUMN IS STRICTLY ACTIONS */}
          <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8DFD3] text-[11px] font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap">
                    {/* 1ST COLUMN: STRICTLY ACTIONS AS REQUESTED */}
                    <th className="py-3.5 px-4 bg-[#F5EFE6] border-r border-[#DECDB8] sticky left-0 z-10 text-[#431021] font-extrabold shadow-xs min-w-[150px]">
                      ⚡ Actions
                    </th>
                    <th className="py-3.5 px-4 min-w-[170px]">Staff Member</th>
                    <th className="py-3.5 px-4 min-w-[130px]">Username</th>
                    <th className="py-3.5 px-4 min-w-[120px]">Role</th>
                    <th className="py-3.5 px-4 min-w-[220px]">Permitted Pages</th>
                    <th className="py-3.5 px-4 min-w-[170px]">Production Stages Access</th>
                    <th className="py-3.5 px-4 min-w-[150px]">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DC]">
                  {filteredUsers.map((user) => {
                    const isActive = user.id === activeUserId;
                    const isConfirmingDelete = deleteConfirmId === user.id;
                    const isAdmin = user.role === 'Admin' || user.isAdmin;
                    const allowedPagesList = user.allowedPages || [];
                    const allowedStagesCount = user.allowedStages ? user.allowedStages.length : 10;

                    return (
                      <tr key={user.id} className={`hover:bg-[#FCFAF7] transition-colors ${isActive ? 'bg-[#FAF5EE]/70' : ''}`}>
                        
                        {/* 1ST COLUMN: ACTIONS */}
                        <td className="py-3 px-4 bg-[#FBF9F5] border-r border-[#DECDB8] sticky left-0 z-10 shadow-xs align-middle">
                          {isConfirmingDelete ? (
                            <div className="flex items-center gap-1.5 animate-in fade-in">
                              <span className="text-[11px] text-rose-600 font-bold">Delete?</span>
                              <button
                                onClick={() => {
                                  onDeleteUser(user.id);
                                  setDeleteConfirmId(null);
                                }}
                                className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[10px] hover:bg-stone-300"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onOpenEditUser(user)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#5B172E] bg-white border border-[#DECDB8] hover:bg-[#FAF5EE] shadow-2xs transition-all"
                                title="Edit Staff & Page Access"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => setDeleteConfirmId(user.id)}
                                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Delete User"
                                disabled={isAdmin && users.filter(u => u.role === 'Admin').length === 1}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* User Info */}
                        <td className="py-3 px-4 align-middle">
                          <div className="flex items-center space-x-3">
                            <div className={`w-9 h-9 rounded-full ${user.avatarColor || 'bg-[#5B172E]'} text-white flex items-center justify-center font-serif font-bold text-xs shrink-0 shadow-2xs`}>
                              {user.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900 text-sm">{user.name}</span>
                                {isActive && (
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    Current
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-stone-400 font-mono">{user.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* Username */}
                        <td className="py-3 px-4 font-mono font-bold text-stone-700 align-middle">
                          {user.username || user.email?.split('@')[0]}
                        </td>

                        {/* Role: Admin or User */}
                        <td className="py-3 px-4 align-middle">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isAdmin 
                              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>

                        {/* Permitted Pages Badges */}
                        <td className="py-3 px-4 align-middle">
                          {isAdmin ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5EE] text-[#9B783E] border border-[#DECDB8]">
                              <ShieldCheck className="w-3 h-3 text-[#9B783E]" />
                              <span>Full Access (All Pages)</span>
                            </span>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {allowedPagesList.length === 0 ? (
                                <span className="text-[10px] text-rose-500 font-semibold">No Pages Assigned</span>
                              ) : (
                                allowedPagesList.map((pg) => (
                                  <span
                                    key={pg}
                                    className="px-2 py-0.5 rounded bg-white border border-[#DECDB8] text-[10px] font-semibold text-stone-700 capitalize shadow-2xs"
                                  >
                                    {pg}
                                  </span>
                                ))
                              )}
                            </div>
                          )}
                        </td>

                        {/* Production Stages Access */}
                        <td className="py-3 px-4 align-middle">
                          {isAdmin ? (
                            <span className="text-xs font-semibold text-emerald-700">
                              All 10 Stages Permitted
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#5B172E]">
                                {allowedStagesCount}/10
                              </span>
                              <span className="text-[10px] text-stone-500">stages permitted</span>
                            </div>
                          )}
                        </td>

                        {/* Contact */}
                        <td className="py-3 px-4 space-y-0.5 text-[11px] align-middle">
                          {user.phone && (
                            <div className="flex items-center gap-1 text-stone-600">
                              <Phone className="w-3 h-3 text-stone-400" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                          {user.email && (
                            <div className="flex items-center gap-1 text-stone-500 truncate max-w-[140px]">
                              <Mail className="w-3 h-3 text-stone-400" />
                              <span>{user.email}</span>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: MASTER DATA MANAGEMENT (CUSTOMERS, VENDORS, TRANSPORTERS, ETC) */}
      {/* ===================================================================== */}
      {activeMainTab === 'masters' && (
        <div className="space-y-4">
          
          {/* Sub-Tabs Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-[#FAF6F0] p-1.5 rounded-2xl border border-[#DECDB8]">
            <button
              onClick={() => {
                setMasterSubTab('customers');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                masterSubTab === 'customers'
                  ? 'bg-[#5B172E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customers / Clients ({customers.length})</span>
            </button>

            <button
              onClick={() => {
                setMasterSubTab('vendors');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                masterSubTab === 'vendors'
                  ? 'bg-[#5B172E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Vendors & Suppliers ({vendors.length})</span>
            </button>

            <button
              onClick={() => {
                setMasterSubTab('transporters');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                masterSubTab === 'transporters'
                  ? 'bg-[#5B172E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Transporters & Logistics ({transporters.length})</span>
            </button>

            <button
              onClick={() => {
                setMasterSubTab('karigars');
                setSearchTerm('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                masterSubTab === 'karigars'
                  ? 'bg-[#5B172E] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Karigars & Masters ({karigars.length})</span>
            </button>
          </div>

          {/* Search Controls for Masters */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DFD3] shadow-xs flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search in ${masterSubTab}...`}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DECDB8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30 text-stone-800"
              />
            </div>

            <div className="text-xs text-stone-500">
              Active Records: <strong className="text-[#5B172E]">
                {masterSubTab === 'customers' ? filteredCustomers.length :
                 masterSubTab === 'vendors' ? filteredVendors.length :
                 masterSubTab === 'transporters' ? filteredTransporters.length : filteredKarigars.length}
              </strong>
            </div>
          </div>

          {/* ================================================================= */}
          {/* MASTER 1: CUSTOMERS MASTER TABLE                                 */}
          {/* 1ST COLUMN IS STRICTLY ACTIONS WITH BUTTONS AS REQUESTED          */}
          {/* ================================================================= */}
          {masterSubTab === 'customers' && (
            <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8DFD3] text-[11px] font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap">
                      <th className="py-3.5 px-4 bg-[#F5EFE6] border-r border-[#DECDB8] sticky left-0 z-10 text-[#431021] font-extrabold shadow-xs min-w-[150px]">
                        ⚡ Actions
                      </th>
                      <th className="py-3.5 px-4 min-w-[120px]">Client ID</th>
                      <th className="py-3.5 px-4 min-w-[170px]">Customer Name</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Mobile / Contact</th>
                      <th className="py-3.5 px-4 min-w-[120px]">City</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Category</th>
                      <th className="py-3.5 px-4 min-w-[200px]">Address</th>
                      <th className="py-3.5 px-4 min-w-[220px]">Bespoke Notes / Style</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DC]">
                    {filteredCustomers.map((cust) => {
                      const isConfirming = deleteConfirmId === cust.id;
                      return (
                        <tr key={cust.id} className="hover:bg-[#FCFAF7] transition-colors">
                          {/* 1ST COLUMN: ACTIONS */}
                          <td className="py-3 px-4 bg-[#FBF9F5] border-r border-[#DECDB8] sticky left-0 z-10 shadow-xs align-middle">
                            {isConfirming ? (
                              <div className="flex items-center gap-1.5 animate-in fade-in">
                                <span className="text-[11px] text-rose-600 font-bold">Delete?</span>
                                <button
                                  onClick={() => handleDeleteMaster('customer', cust.id)}
                                  className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[10px] hover:bg-stone-300"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEditMaster('customer', cust)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#5B172E] bg-white border border-[#DECDB8] hover:bg-[#FAF5EE] shadow-2xs transition-all"
                                  title="Edit Customer"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmId(cust.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Customer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4 font-mono font-bold text-[#5B172E] align-middle">{cust.id}</td>
                          <td className="py-3 px-4 font-bold text-stone-900 align-middle">{cust.name}</td>
                          <td className="py-3 px-4 text-stone-700 align-middle">
                            <div className="font-semibold font-mono text-xs">
                              {maskCustomerMobile(cust.phone, currentUser)}
                            </div>
                            {cust.email && <div className="text-[10px] text-stone-400">{cust.email}</div>}
                          </td>
                          <td className="py-3 px-4 font-medium text-stone-800 align-middle">{cust.city}</td>
                          <td className="py-3 px-4 align-middle">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5EE] text-[#9B783E] border border-[#DECDB8]">
                              {cust.category || 'VIP Client'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 max-w-xs truncate align-middle" title={cust.address}>
                            {cust.address}
                          </td>
                          <td className="py-3 px-4 text-stone-500 text-[11px] align-middle italic">
                            "{cust.notes || 'No specific preferences recorded.'}"
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* MASTER 2: VENDORS & SUPPLIERS TABLE                              */}
          {/* 1ST COLUMN IS STRICTLY ACTIONS WITH BUTTONS AS REQUESTED          */}
          {/* ================================================================= */}
          {masterSubTab === 'vendors' && (
            <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8DFD3] text-[11px] font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap">
                      <th className="py-3.5 px-4 bg-[#F5EFE6] border-r border-[#DECDB8] sticky left-0 z-10 text-[#431021] font-extrabold shadow-xs min-w-[150px]">
                        ⚡ Actions
                      </th>
                      <th className="py-3.5 px-4 min-w-[110px]">Vendor Code</th>
                      <th className="py-3.5 px-4 min-w-[180px]">Vendor Name</th>
                      <th className="py-3.5 px-4 min-w-[200px]">Supply Category</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Contact Person</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Phone</th>
                      <th className="py-3.5 px-4 min-w-[120px]">City / Base</th>
                      <th className="py-3.5 px-4 min-w-[160px]">GST Number</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Rating / Terms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DC]">
                    {filteredVendors.map((vnd) => {
                      const isConfirming = deleteConfirmId === vnd.id;
                      return (
                        <tr key={vnd.id} className="hover:bg-[#FCFAF7] transition-colors">
                          {/* 1ST COLUMN: ACTIONS */}
                          <td className="py-3 px-4 bg-[#FBF9F5] border-r border-[#DECDB8] sticky left-0 z-10 shadow-xs align-middle">
                            {isConfirming ? (
                              <div className="flex items-center gap-1.5 animate-in fade-in">
                                <span className="text-[11px] text-rose-600 font-bold">Delete?</span>
                                <button
                                  onClick={() => handleDeleteMaster('vendor', vnd.id)}
                                  className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[10px] hover:bg-stone-300"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEditMaster('vendor', vnd)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#5B172E] bg-white border border-[#DECDB8] hover:bg-[#FAF5EE] shadow-2xs transition-all"
                                  title="Edit Vendor"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmId(vnd.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Vendor"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4 font-mono font-bold text-[#5B172E] align-middle">{vnd.id}</td>
                          <td className="py-3 px-4 font-bold text-stone-900 align-middle">{vnd.name}</td>
                          <td className="py-3 px-4 align-middle">
                            <span className="px-2 py-0.5 rounded bg-[#F2ECE1] text-[#9B783E] font-semibold text-[10px]">
                              {vnd.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-stone-800 align-middle">{vnd.contactPerson}</td>
                          <td className="py-3 px-4 text-stone-700 font-medium align-middle">{vnd.phone}</td>
                          <td className="py-3 px-4 text-stone-600 align-middle">{vnd.city}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-stone-500 align-middle">{vnd.gstNo || 'Unregistered'}</td>
                          <td className="py-3 px-4 align-middle">
                            <div className="text-[11px] font-bold text-stone-700">{vnd.rating}</div>
                            <div className="text-[10px] text-stone-400">{vnd.terms}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* MASTER 3: TRANSPORTERS & LOGISTICS TABLE                         */}
          {/* 1ST COLUMN IS STRICTLY ACTIONS WITH BUTTONS AS REQUESTED          */}
          {/* ================================================================= */}
          {masterSubTab === 'transporters' && (
            <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8DFD3] text-[11px] font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap">
                      <th className="py-3.5 px-4 bg-[#F5EFE6] border-r border-[#DECDB8] sticky left-0 z-10 text-[#431021] font-extrabold shadow-xs min-w-[150px]">
                        ⚡ Actions
                      </th>
                      <th className="py-3.5 px-4 min-w-[110px]">Code</th>
                      <th className="py-3.5 px-4 min-w-[190px]">Transporter / Courier</th>
                      <th className="py-3.5 px-4 min-w-[200px]">Service Delivery Type</th>
                      <th className="py-3.5 px-4 min-w-[150px]">Account Contact</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Phone</th>
                      <th className="py-3.5 px-4 min-w-[120px]">Hub Base</th>
                      <th className="py-3.5 px-4 min-w-[220px]">Operating Coverage Routes</th>
                      <th className="py-3.5 px-4 min-w-[130px]">Avg Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DC]">
                    {filteredTransporters.map((trn) => {
                      const isConfirming = deleteConfirmId === trn.id;
                      return (
                        <tr key={trn.id} className="hover:bg-[#FCFAF7] transition-colors">
                          {/* 1ST COLUMN: ACTIONS */}
                          <td className="py-3 px-4 bg-[#FBF9F5] border-r border-[#DECDB8] sticky left-0 z-10 shadow-xs align-middle">
                            {isConfirming ? (
                              <div className="flex items-center gap-1.5 animate-in fade-in">
                                <span className="text-[11px] text-rose-600 font-bold">Delete?</span>
                                <button
                                  onClick={() => handleDeleteMaster('transporter', trn.id)}
                                  className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[10px] hover:bg-stone-300"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEditMaster('transporter', trn)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#5B172E] bg-white border border-[#DECDB8] hover:bg-[#FAF5EE] shadow-2xs transition-all"
                                  title="Edit Transporter"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmId(trn.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Transporter"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4 font-mono font-bold text-[#5B172E] align-middle">{trn.id}</td>
                          <td className="py-3 px-4 font-bold text-stone-900 align-middle">{trn.name}</td>
                          <td className="py-3 px-4 align-middle">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-[10px]">
                              {trn.serviceType}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-stone-800 align-middle">{trn.contactPerson}</td>
                          <td className="py-3 px-4 text-stone-700 font-medium align-middle">{trn.phone}</td>
                          <td className="py-3 px-4 text-stone-600 align-middle">{trn.hubCity}</td>
                          <td className="py-3 px-4 text-stone-600 max-w-xs truncate align-middle" title={trn.operatingRoutes}>
                            {trn.operatingRoutes}
                          </td>
                          <td className="py-3 px-4 font-semibold text-emerald-700 align-middle">{trn.avgTransitTime}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* MASTER 4: KARIGARS & MASTERS TABLE                               */}
          {/* 1ST COLUMN IS STRICTLY ACTIONS WITH BUTTONS AS REQUESTED          */}
          {/* ================================================================= */}
          {masterSubTab === 'karigars' && (
            <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8DFD3] text-[11px] font-bold uppercase tracking-wider text-stone-600 whitespace-nowrap">
                      <th className="py-3.5 px-4 bg-[#F5EFE6] border-r border-[#DECDB8] sticky left-0 z-10 text-[#431021] font-extrabold shadow-xs min-w-[150px]">
                        ⚡ Actions
                      </th>
                      <th className="py-3.5 px-4 min-w-[110px]">Artisan ID</th>
                      <th className="py-3.5 px-4 min-w-[170px]">Karigar / Master Name</th>
                      <th className="py-3.5 px-4 min-w-[220px]">Craft Specialization</th>
                      <th className="py-3.5 px-4 min-w-[180px]">Workshop Bay / Unit</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Phone</th>
                      <th className="py-3.5 px-4 min-w-[150px]">Skill Grade</th>
                      <th className="py-3.5 px-4 min-w-[140px]">Duty Status</th>
                      <th className="py-3.5 px-4 min-w-[180px]">Daily Capacity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DC]">
                    {filteredKarigars.map((krg) => {
                      const isConfirming = deleteConfirmId === krg.id;
                      return (
                        <tr key={krg.id} className="hover:bg-[#FCFAF7] transition-colors">
                          {/* 1ST COLUMN: ACTIONS */}
                          <td className="py-3 px-4 bg-[#FBF9F5] border-r border-[#DECDB8] sticky left-0 z-10 shadow-xs align-middle">
                            {isConfirming ? (
                              <div className="flex items-center gap-1.5 animate-in fade-in">
                                <span className="text-[11px] text-rose-600 font-bold">Delete?</span>
                                <button
                                  onClick={() => handleDeleteMaster('karigar', krg.id)}
                                  className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[10px] hover:bg-stone-300"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEditMaster('karigar', krg)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#5B172E] bg-white border border-[#DECDB8] hover:bg-[#FAF5EE] shadow-2xs transition-all"
                                  title="Edit Karigar"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => setDeleteConfirmId(krg.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete Karigar"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4 font-mono font-bold text-[#5B172E] align-middle">{krg.id}</td>
                          <td className="py-3 px-4 font-bold text-stone-900 align-middle">{krg.name}</td>
                          <td className="py-3 px-4 align-middle">
                            <span className="font-semibold text-stone-800 text-[11px]">
                              {krg.specialization}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 align-middle">{krg.unit}</td>
                          <td className="py-3 px-4 text-stone-700 font-medium align-middle">{krg.phone}</td>
                          <td className="py-3 px-4 align-middle">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5EE] text-[#9B783E] border border-[#DECDB8]">
                              {krg.skillGrade}
                            </span>
                          </td>
                          <td className="py-3 px-4 align-middle">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>{krg.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 text-[11px] align-middle">{krg.dailyCapacity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* MASTER DATA ADD / EDIT MODAL */}
      <MasterEntryModal
        isOpen={isMasterModalOpen}
        onClose={() => {
          setIsMasterModalOpen(false);
          setEditingMasterItem(null);
        }}
        type={masterModalType}
        initialData={editingMasterItem}
        onSubmit={handleSubmitMaster}
        nextId={
          masterModalType === 'customer' ? `CUST-${(customers.length + 1).toString().padStart(3, '0')}` :
          masterModalType === 'vendor' ? `VND-${(vendors.length + 1).toString().padStart(3, '0')}` :
          masterModalType === 'transporter' ? `TRN-${(transporters.length + 1).toString().padStart(3, '0')}` :
          `KRG-${(karigars.length + 1).toString().padStart(3, '0')}`
        }
      />

    </div>
  );
};
