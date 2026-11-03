import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  User, 
  Building2, 
  Truck, 
  Scissors, 
  Phone, 
  Mail, 
  MapPin, 
  Tag, 
  FileText,
  Star
} from 'lucide-react';

export const MasterEntryModal = ({
  isOpen,
  onClose,
  type, // 'customer' | 'vendor' | 'transporter' | 'karigar'
  initialData = null,
  onSubmit,
  nextId
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      // Default empty templates
      if (type === 'customer') {
        setFormData({
          id: nextId || `CUST-${Date.now().toString().slice(-3)}`,
          name: '',
          phone: '',
          email: '',
          city: '',
          address: '',
          category: 'VIP Bridal',
          notes: ''
        });
      } else if (type === 'vendor') {
        setFormData({
          id: nextId || `VND-${Date.now().toString().slice(-3)}`,
          name: '',
          category: 'Pure Silk & Chanderi Fabrics',
          contactPerson: '',
          phone: '',
          city: '',
          address: '',
          gstNo: '',
          rating: '⭐⭐⭐⭐⭐ Top Tier',
          terms: '15 Days Credit'
        });
      } else if (type === 'transporter') {
        setFormData({
          id: nextId || `TRN-${Date.now().toString().slice(-3)}`,
          name: '',
          serviceType: 'Priority Air Courier (Express 24-48h)',
          contactPerson: '',
          phone: '',
          hubCity: '',
          operatingRoutes: 'Domestic Metros & Tier 1 Cities',
          trackingUrl: '',
          avgTransitTime: '24-48 Hours'
        });
      } else if (type === 'karigar') {
        setFormData({
          id: nextId || `KRG-${Date.now().toString().slice(-3)}`,
          name: '',
          specialization: 'Senior Stitching Master (Blouses & Bodice Fitting)',
          unit: 'Central Atelier - Tailoring Floor 1',
          phone: '',
          skillGrade: 'Grade A+ (Master Artisan)',
          status: 'Active (On Duty)',
          dailyCapacity: '1 Garment / Day'
        });
      }
    }
    setErrors({});
  }, [initialData, type, isOpen, nextId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Contact phone is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const getTitle = () => {
    const action = initialData ? 'Edit' : 'Add New';
    switch (type) {
      case 'customer': return `${action} Customer Record`;
      case 'vendor': return `${action} Vendor / Supplier`;
      case 'transporter': return `${action} Transporter / Logistics Partner`;
      case 'karigar': return `${action} Karigar / Artisan Master`;
      default: return `${action} Master Record`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'customer': return <User className="w-5 h-5 text-[#C5A059]" />;
      case 'vendor': return <Building2 className="w-5 h-5 text-[#C5A059]" />;
      case 'transporter': return <Truck className="w-5 h-5 text-[#C5A059]" />;
      case 'karigar': return <Scissors className="w-5 h-5 text-[#C5A059]" />;
      default: return <Tag className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#E2D5C3] rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8DFD3] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#5B172E] text-white flex items-center justify-center font-serif font-bold text-base shadow-xs">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-[#431021]">
                  {getTitle()}
                </h2>
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-[#F2ECE1] text-[#9B783E]">
                  {formData.id}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Atelier Master Repository Entry
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs scrollbar-thin">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">
                {type === 'customer' ? 'Customer / Client Name' : 
                 type === 'vendor' ? 'Vendor / Company Name' : 
                 type === 'transporter' ? 'Transporter / Courier Name' : 'Karigar / Master Name'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter name..."
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30 ${
                  errors.name ? 'border-rose-400 bg-rose-50' : 'border-[#DECDB8]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Contact Phone <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30 ${
                  errors.phone ? 'border-rose-400 bg-rose-50' : 'border-[#DECDB8]'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Email (For Customer / Vendor / Transporter) */}
            {type !== 'karigar' && (
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="contact@domain.com"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                />
              </div>
            )}

            {/* City / Hub */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {type === 'transporter' ? 'Hub City / Base' : 'City'}
              </label>
              <input
                type="text"
                value={formData.city || formData.hubCity || ''}
                onChange={(e) => handleChange(type === 'transporter' ? 'hubCity' : 'city', e.target.value)}
                placeholder="e.g. New Delhi, Mumbai, Surat"
                className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
              />
            </div>

            {/* TYPE SPECIFIC FIELDS: CUSTOMER */}
            {type === 'customer' && (
              <>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Client Category
                  </label>
                  <select
                    value={formData.category || 'VIP Bridal'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  >
                    <option value="VIP Bridal">VIP Bridal</option>
                    <option value="Couture Trousseau">Couture Trousseau</option>
                    <option value="High Net Bespoke">High Net Bespoke</option>
                    <option value="Wedding Guest Luxury">Wedding Guest Luxury</option>
                    <option value="Royal Heritage">Royal Heritage</option>
                    <option value="Festive Pret">Festive Pret</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Client Address
                  </label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Full residential / delivery address"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Bespoke Notes / Fitting Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes || ''}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Color palette preference, silhouette requests, special instructions..."
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>
              </>
            )}

            {/* TYPE SPECIFIC FIELDS: VENDOR */}
            {type === 'vendor' && (
              <>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Supply Category
                  </label>
                  <select
                    value={formData.category || 'Pure Silk & Chanderi Fabrics'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  >
                    <option value="Pure Silk & Chanderi Fabrics">Pure Silk & Chanderi Fabrics</option>
                    <option value="Organza, Tissue & Santoon Lining">Organza, Tissue & Santoon Lining</option>
                    <option value="Pure Gold & Silver Zari, Resham Threads">Pure Gold & Silver Zari, Resham Threads</option>
                    <option value="Organic Dyeing & Custom Shade Matching">Organic Dyeing & Custom Shade Matching</option>
                    <option value="Couture Cancan, Latkans, YKK Zippers & Cups">Couture Cancan, Latkans, YKK Zippers & Cups</option>
                    <option value="Micro Cut Sequins, Seed Beads & Swarovskis">Micro Cut Sequins, Seed Beads & Swarovskis</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson || ''}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    placeholder="e.g. Rajesh Shah"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={formData.gstNo || ''}
                    onChange={(e) => handleChange('gstNo', e.target.value)}
                    placeholder="e.g. 09AAACB1234F1Z5"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={formData.terms || '15 Days Credit'}
                    onChange={(e) => handleChange('terms', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  >
                    <option value="Immediate / Cash">Immediate / Cash</option>
                    <option value="7 Days Rolling">7 Days Rolling</option>
                    <option value="15 Days Credit">15 Days Credit</option>
                    <option value="30 Days Net">30 Days Net</option>
                    <option value="Advance Deposit">Advance Deposit</option>
                  </select>
                </div>
              </>
            )}

            {/* TYPE SPECIFIC FIELDS: TRANSPORTER */}
            {type === 'transporter' && (
              <>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Service Delivery Type
                  </label>
                  <select
                    value={formData.serviceType || 'Priority Air Courier (Express 24-48h)'}
                    onChange={(e) => handleChange('serviceType', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  >
                    <option value="Priority Air Courier (Express 24-48h)">Priority Air Courier (Express 24-48h)</option>
                    <option value="Protected Couture Box Transit">Protected Couture Box Transit</option>
                    <option value="White-Glove Local Delivery & Home Trial">White-Glove Local Delivery & Home Trial</option>
                    <option value="International NRI Express Doorstep Delivery">International NRI Express Doorstep Delivery</option>
                    <option value="Secured Waterproof Heavy Garment Trunk">Secured Waterproof Heavy Garment Trunk</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Contact Person / Desk
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson || ''}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    placeholder="e.g. Ramesh Nair"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Avg Transit Time
                  </label>
                  <input
                    type="text"
                    value={formData.avgTransitTime || '24-48 Hours'}
                    onChange={(e) => handleChange('avgTransitTime', e.target.value)}
                    placeholder="e.g. 24-36 Hours, Same Day"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Operating Routes & Coverage
                  </label>
                  <input
                    type="text"
                    value={formData.operatingRoutes || ''}
                    onChange={(e) => handleChange('operatingRoutes', e.target.value)}
                    placeholder="e.g. Domestic Metros, Delhi-NCR, Pan-India"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>
              </>
            )}

            {/* TYPE SPECIFIC FIELDS: KARIGAR */}
            {type === 'karigar' && (
              <>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Artisan Craft Specialization
                  </label>
                  <select
                    value={formData.specialization || 'Senior Stitching Master (Blouses & Bodice Fitting)'}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  >
                    <option value="Senior Stitching Master (Blouses & Bodice Fitting)">Senior Stitching Master (Blouses & Bodice Fitting)</option>
                    <option value="Adda Zardozi, Marodi & Antique Dabka Ustad">Adda Zardozi, Marodi & Antique Dabka Ustad</option>
                    <option value="Women Master 1 (Lehenga Panel Flare & Cancan Tailoring)">Women Master 1 (Lehenga Panel Flare & Cancan Tailoring)</option>
                    <option value="Precision Khaka Tracing & Base Fabric Master Cutter">Precision Khaka Tracing & Base Fabric Master Cutter</option>
                    <option value="First QC Tape Inspector & Dart Correction Specialist">First QC Tape Inspector & Dart Correction Specialist</option>
                    <option value="Steam Pressing, Hooks, Dori Latkans & Final Packaging">Steam Pressing, Hooks, Dori Latkans & Final Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Workshop Unit / Location
                  </label>
                  <input
                    type="text"
                    value={formData.unit || ''}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    placeholder="e.g. Central Atelier - Floor 1"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Skill Grade / Level
                  </label>
                  <select
                    value={formData.skillGrade || 'Grade A+ (Master Artisan)'}
                    onChange={(e) => handleChange('skillGrade', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  >
                    <option value="Ustad Karigar (30 Yrs Exp)">Ustad Karigar (30 Yrs Exp)</option>
                    <option value="Grade A+ (Master Artisan)">Grade A+ (Master Artisan)</option>
                    <option value="Grade A (Senior Artisan)">Grade A (Senior Artisan)</option>
                    <option value="Grade B (Skilled Artisan)">Grade B (Skilled Artisan)</option>
                    <option value="Senior QC Inspector">Senior QC Inspector</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Daily Capacity / Output Remark
                  </label>
                  <input
                    type="text"
                    value={formData.dailyCapacity || ''}
                    onChange={(e) => handleChange('dailyCapacity', e.target.value)}
                    placeholder="e.g. 2 Blouses or 1 Lehenga / Day"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#DECDB8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B172E]/30"
                  />
                </div>
              </>
            )}

          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DFD3]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5B172E] hover:bg-[#431021] shadow-xs hover:shadow transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{initialData ? 'Update Record' : 'Save Record'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

