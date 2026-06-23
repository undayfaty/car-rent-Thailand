import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircle, Download, Printer, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, FileImage, FileText, CheckCircle } from 'lucide-react';

export interface DocumentInfo {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  url: string;
}

interface DocumentPreviewModalProps {
  documents: DocumentInfo[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export default function DocumentPreviewModal({ documents, isOpen, onClose, title = "ตรวจสอบเอกสาร", onApprove, onReject }: DocumentPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || documents.length === 0 || !mounted) return null;

  const currentDoc = documents[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % documents.length);
    setZoom(1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + documents.length) % documents.length);
    setZoom(1);
  };

  const handlePrint = () => {
    const printWindow = window.open(currentDoc.url, '_blank');
    if (printWindow) {
      printWindow.onload = () => printWindow.print();
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = currentDoc.url;
    a.download = currentDoc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-t-card w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-t-border">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-t-sidebar border-b border-t-border">
          <div className="flex items-center gap-3">
            {currentDoc.type === 'pdf' ? <FileText className="w-6 h-6 text-red-400" /> : <FileImage className="w-6 h-6 text-blue-400" />}
            <span className="font-bold text-lg text-t-text">{title}</span>
            <span className="px-3 py-1 bg-t-muted/10 text-t-muted text-sm font-bold rounded-full">
              {currentIndex + 1} / {documents.length}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-t-muted mr-4 hidden sm:block">{currentDoc.name}</span>
            
            {/* Zoom Controls */}
            <div className="flex items-center bg-t-bg rounded-lg border border-t-border p-1">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1.5 text-t-muted hover:bg-t-muted/20 rounded transition-colors" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-t-text w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1.5 text-t-muted hover:bg-t-muted/20 rounded transition-colors" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-1 ml-2">
              <button onClick={handlePrint} className="p-2 text-t-muted hover:bg-t-muted/10 rounded transition-colors" title="Print">
                <Printer className="w-5 h-5" />
              </button>
              <button onClick={handleDownload} className="p-2 text-t-muted hover:bg-t-muted/10 rounded transition-colors" title="Download">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-t-bg relative">
          {/* Navigation Arrows (Always Visible) */}
          {documents.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-6 z-10 p-4 bg-white/90 text-black shadow-lg rounded-full hover:bg-white hover:scale-110 transition-all border border-gray-200">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="absolute right-6 z-10 p-4 bg-white/90 text-black shadow-lg rounded-full hover:bg-white hover:scale-110 transition-all border border-gray-200">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Document Display */}
          <div 
            className="transition-transform duration-200 ease-out flex items-center justify-center p-8 min-h-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {currentDoc.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={currentDoc.url} 
                alt={currentDoc.name} 
                className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded"
                draggable={false}
              />
            ) : (
              <div className="bg-white p-12 shadow-2xl rounded w-[210mm] min-h-[297mm] text-black">
                <h2 className="text-3xl font-bold mb-6">{currentDoc.name}</h2>
                <p className="text-gray-500 mb-10 text-lg">This is a mockup of a PDF document preview.</p>
                <div className="space-y-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-t-card border-t border-t-border flex justify-between items-center">
          <div className="text-sm font-semibold text-t-muted">
            สามารถซูมและดาวน์โหลดไฟล์ได้จากเมนูด้านบน
          </div>
          <div className="flex gap-3">
            {onReject && (
              <button 
                onClick={onReject}
                className="px-6 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 font-bold rounded-xl transition-colors flex items-center gap-2"
              >
                <XCircle className="w-5 h-5" /> ไม่อนุมัติ
              </button>
            )}
            {onApprove && (
              <button 
                onClick={onApprove}
                className="px-6 py-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-bold rounded-xl transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> อนุมัติเอกสาร
              </button>
            )}
            <button 
              onClick={onClose} 
              className="px-8 py-2.5 bg-t-muted text-white font-bold hover:bg-t-text rounded-xl shadow-md transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
