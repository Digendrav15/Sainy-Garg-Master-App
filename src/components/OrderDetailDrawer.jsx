import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  Calendar, 
  Phone, 
  MapPin, 
  Ruler, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Scissors, 
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { STAGES, UPPER_BODY_MEASUREMENTS, LOWER_BODY_MEASUREMENTS } from '../types/stages';
import { PrintableJobSheet } from './PrintableJobSheet';
import { maskCustomerMobile } from '../utils/privacy';

export const OrderDetailDrawer = ({
  order,
  isOpen,
  onClose,
  onAdvanceStage,
  onOpenMeasurements,
  currentUser
}) => {
  if (!isOpen || !order) return null;

  const [activeTab, setActiveTab] = useState('sheet'); // 'sheet' | 'pipeline' | 'print'
  const currentStage = STAGES.find(s => s.id === order.currentStageId) || STAGES[0];
  const currentStageIndex = STAGES.findIndex(s => s.id === order.currentStageId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#E2D5C3] rounded-2xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8DFD3] flex items-center justify-between no-print">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#5B172E] text-[#FAF6F0] flex items-center justify-center shadow-xs">
              <span className="font-serif font-bold text-sm tracking-wider">SG</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#5B172E]">{order.id}</span>
                <span className="text-stone-300">•</span>
                <h2 className="font-serif text-lg font-bold text-[#431021]">
                  {order.clientName}
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-[#F2ECE1] text-[#9B783E]">
                  Stage {currentStageIndex + 1}: {currentStage.name}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Created: {new Date(order.createdAt).toLocaleDateString()} • {order.city} • <span className="font-mono">{maskCustomerMobile(order.mobile, currentUser)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="hidden sm:flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#DECDB8] text-xs">
              <button
                onClick={() => setActiveTab('sheet')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'sheet' ? 'bg-[#5B172E] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Order Sheet
              </button>
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'pipeline' ? 'bg-[#5B172E] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                10-Stage Audit
              </button>
              <button
                onClick={() => setActiveTab('print')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'print' ? 'bg-[#5B172E] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Print Preview
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-white border border-[#DECDB8] hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#9B783E]" />
              <span className="hidden sm:inline">Print Sheet</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* TAB 1: ORDER SHEET (Matching User Mockup) */}
          {activeTab === 'sheet' && (
            <div className="space-y-6">
              
              {/* Reference Pictures & Sketch (like Image 3 in user uploads) */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-xs">
                <h3 className="font-serif font-bold text-base text-[#431021] mb-3 flex items-center justify-between border-b pb-2">
                  <span>1. Pictures & Sketches</span>
                  <span className="text-xs text-stone-400 font-sans font-normal">
                    One order number connects pictures, sketch, measurements and instructions.
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Inspiration */}
                  <div className="border border-[#DECDB8] rounded-xl overflow-hidden bg-[#FAF8F5]">
                    <div className="p-2 border-b border-[#DECDB8] text-[11px] font-bold text-center text-stone-600 bg-white">
                      Inspiration Photo
                    </div>
                    <div className="h-56 sm:h-64 flex items-center justify-center p-2">
                      <img
                        src={order.inspirationImages?.[0] || order.designImages?.[0]}
                        alt="Inspiration"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Design Sketch */}
                  <div className="border border-[#DECDB8] rounded-xl overflow-hidden bg-[#FAF8F5]">
                    <div className="p-2 border-b border-[#DECDB8] text-[11px] font-bold text-center text-stone-600 bg-white">
                      Design Sketch
                    </div>
                    <div className="h-56 sm:h-64 flex items-center justify-center p-2">
                      <img
                        src={order.designImages?.[0] || '/assets/sg-1024-lehenga.jpg'}
                        alt="Design sketch"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Final Outfit Reference */}
                  <div className="border border-[#DECDB8] rounded-xl overflow-hidden bg-[#FAF8F5]">
                    <div className="p-2 border-b border-[#DECDB8] text-[11px] font-bold text-center text-stone-600 bg-white">
                      Final Outfit / Workmanship Preview
                    </div>
                    <div className="h-56 sm:h-64 flex items-center justify-center p-2">
                      <img
                        src={order.designImages?.[1] || order.designImages?.[0] || '/assets/sg-1042-rose.jpg'}
                        alt="Final Outfit"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Measurements & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left: Design Details */}
                <div className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-xs space-y-3">
                  <h3 className="font-serif font-bold text-base text-[#431021] border-b pb-2 flex items-center justify-between">
                    <span>Design Details</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#FAF5EE] text-[#9B783E] font-bold">
                      Size: {order.size}
                    </span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE7DC]">
                      <span className="text-stone-400 block text-[10px]">Design Name</span>
                      <strong className="text-stone-800">{order.designName}</strong>
                    </div>

                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE7DC]">
                      <span className="text-stone-400 block text-[10px]">Client Contact</span>
                      <strong className="text-stone-800">{order.clientName} ({maskCustomerMobile(order.mobile, currentUser)})</strong>
                    </div>

                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE7DC]">
                      <span className="text-stone-400 block text-[10px]">Trial Date</span>
                      <strong className="text-stone-800">{order.trialDate}</strong>
                    </div>

                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE7DC]">
                      <span className="text-stone-400 block text-[10px]">Delivery Date</span>
                      <strong className="text-[#5B172E] font-bold">{order.deliveryDate}</strong>
                    </div>

                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE7DC]">
                      <span className="text-stone-400 block text-[10px]">Fabric Required</span>
                      <span className="text-stone-800 font-medium">
                        {order.stageData?.material_check?.fabricMeterage || order.designDetails?.fabric || 'Chanderi Silk / Pure Satin'}
                      </span>
                    </div>

                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE7DC]">
                      <span className="text-stone-400 block text-[10px]">Dye Status</span>
                      <span className="font-bold text-[#9B783E]">
                        {order.stageData?.material_check?.dyeStatus || 'Confirmed'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Key Measurements Snapshot */}
                <div className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-serif font-bold text-base text-[#431021] flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-[#9B783E]" />
                      <span>Measurements (Inches)</span>
                    </h3>
                    <button
                      onClick={() => onOpenMeasurements(order)}
                      className="text-xs font-semibold text-[#5B172E] hover:underline"
                    >
                      Edit All Measurements →
                    </button>
                  </div>

                  {/* Upper summary */}
                  {order.measurements?.hasUpper && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-[#9B783E] uppercase tracking-wider block">
                        Upper Body Highlights
                      </span>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Chest</span>
                          <span className="font-bold">{order.measurements?.upper?.chest || '36'}"</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Waist</span>
                          <span className="font-bold">{order.measurements?.upper?.waist || '30'}"</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Shoulder</span>
                          <span className="font-bold">{order.measurements?.upper?.shoulder || '14'}"</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Blouse Len</span>
                          <span className="font-bold">{order.measurements?.upper?.blouseLength || '15'}"</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lower summary */}
                  {order.measurements?.hasLower && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-[#9B783E] uppercase tracking-wider block">
                        Lower Body Highlights
                      </span>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Hip</span>
                          <span className="font-bold">{order.measurements?.lower?.hip || '39'}"</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Skirt Len</span>
                          <span className="font-bold">{order.measurements?.lower?.skirtLength || '40'}"</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Pant Len</span>
                          <span className="font-bold">{order.measurements?.lower?.pantLength || '38'}"</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-1.5 rounded border text-center">
                          <span className="text-[10px] text-stone-400 block">Thigh</span>
                          <span className="font-bold">{order.measurements?.lower?.thigh || '23'}"</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenMeasurements(order)}
                      className="w-full py-2 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#DECDB8] rounded-xl text-xs font-semibold text-[#5B172E] transition-colors"
                    >
                      View Complete 28-Point Measurement Sheet
                    </button>
                  </div>
                </div>

              </div>

              {/* Current Stage Action Card */}
              <div className="bg-[#FAF7F2] border border-[#DECDB8] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B783E]">
                    Current Production Stage
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#431021]">
                    Stage {currentStageIndex + 1}: {currentStage.name}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {currentStage.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {currentStageIndex < 9 ? (
                    <button
                      onClick={() => onAdvanceStage(order.id, currentStage.id, {})}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5B172E] hover:bg-[#431021] shadow-xs hover:shadow transition-all"
                    >
                      <span>Complete & Move to Stage {currentStageIndex + 2}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300">
                      ✓ Delivered / Closed
                    </span>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 10-STAGE AUDIT TIMELINE */}
          {activeTab === 'pipeline' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#431021] border-b pb-3">
                10-Stage Production Lifecycle
              </h3>

              <div className="space-y-4">
                {STAGES.map((stg, idx) => {
                  const isCompleted = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  const isUpcoming = idx > currentStageIndex;
                  const stgData = order.stageData?.[stg.id] || {};

                  return (
                    <div
                      key={stg.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-[#FAF5EE] border-[#5B172E] shadow-sm'
                          : isCompleted
                          ? 'bg-[#F9FCFA] border-emerald-200'
                          : 'bg-stone-50/60 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted 
                              ? 'bg-emerald-600 text-white' 
                              : isCurrent 
                              ? 'bg-[#5B172E] text-white animate-pulse' 
                              : 'bg-stone-200 text-stone-600'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#431021]">
                              {stg.name}
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              {stg.description}
                            </p>
                          </div>
                        </div>

                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCurrent
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}>
                          {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                        </span>
                      </div>

                      {/* Stage Fields Recorded */}
                      {Object.keys(stgData).length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[#EAE2D5] grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                          {Object.entries(stgData).map(([k, v]) => {
                            if (k === 'updatedAt' || !v) return null;
                            return (
                              <div key={k} className="bg-white p-2 rounded border border-[#EFE7DC]">
                                <span className="text-[10px] text-stone-400 capitalize block">
                                  {k.replace(/([A-Z])/g, ' $1')}
                                </span>
                                <span className="font-semibold text-stone-800">{v}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PRINT PREVIEW */}
          {activeTab === 'print' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-[#5B172E] text-white rounded-xl text-xs font-bold hover:bg-[#431021] flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print This Job Sheet</span>
                </button>
              </div>
              <PrintableJobSheet order={order} currentUser={currentUser} />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

