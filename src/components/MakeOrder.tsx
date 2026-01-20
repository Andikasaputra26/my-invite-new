"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, ShoppingCart, X, Check } from "lucide-react";
import { gsap } from "gsap";

const steps = [
  {
    title: "Pesan Undangan Digital",
    content: [
      "Pilih template undangan yang diinginkan. Untuk melihat demo katalog silahkan klik bagian halaman katalog.",
      "Untuk melihat halaman tampilan demo, silahkan klik tombol Lihat Demo, dan catat nomor demo yang diinginkan.",
      "Setelah memilih tema undangan, Anda bisa melakukan pemesanan dengan langsung klik pada tombol halaman pembelian.",
      "Isi form yang disediakan, lalu lakukan pembayaran sesuai dengan pilihan metode pembayaran yang tersedia.",
    ],
  },
  {
    title: "Proses Pengerjaan Orderan",
    content: [
      "Lakukan pembayaran sesuai paket yang dipilih terlebih dahulu untuk memulai pengerjaan.",
      "Pembayaran dilakukan full payment via transfer ke rekening resmi kami yang tertera pada halaman pembayaran & konfirmasi.",
      "Pastikan melakukan konfirmasi pembayaran untuk mempercepat proses pengerjaan.",
      "Estimasi pengerjaan maksimal 2 x 24 jam setelah konfirmasi pembayaran diterima.",
    ],
  },
  {
    title: "Butuh Bantuan / Konsultasi Terlebih Dahulu?",
    content: [
      "Jika mengalami kesulitan dalam pemesanan jasa undangan digital, silahkan hubungi kami melalui chat support WhatsApp: +62 812 3456 78xx",
      "Kami akan dengan senang hati siap membantu Anda.",
    ],
  },
];

const packages = [
  { id: 1, name: "Basic", price: 150000 },
  { id: 2, name: "Standard", price: 250000 },
  { id: 3, name: "Premium", price: 350000 },
];

const templates = [
  { id: 1, name: "Undangan Elegant" },
  { id: 2, name: "Undangan Modern" },
  { id: 3, name: "Undangan Floral" },
  { id: 4, name: "Undangan Classic" },
];

export default function MakeOrder() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    groomParents: "",
    brideParents: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventAddress: "",
    packageId: 1,
    templateId: 1,
    contactName: "",
    whatsapp: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.to(ref, {
          height: i === openIndex ? "auto" : 0,
          opacity: i === openIndex ? 1 : 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  }, [openIndex]);

  useEffect(() => {
    if (showOrderForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOrderForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setOrderSuccess(true);
    
    setTimeout(() => {
      setShowOrderForm(false);
      setOrderSuccess(false);
      setFormStep(1);
      setFormData({
        groomName: "",
        brideName: "",
        groomParents: "",
        brideParents: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventAddress: "",
        packageId: 1,
        templateId: 1,
        contactName: "",
        whatsapp: "",
        email: "",
        notes: "",
      });
    }, 3000);
  };

  const selectedPackage = packages.find(p => p.id === formData.packageId);
  const selectedTemplate = templates.find(t => t.id === formData.templateId);

  return (
    <>
      <section className="relative z-10 bg-gradient-to-b from-pink-50 to-purple-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mx-auto block w-fit rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md">
            CARA ORDER UNDANGAN DIGITAL
          </h2>

          <p className="mt-4 text-center text-lg font-medium text-gray-700">
            Kami siap membantu Anda membagikan momen bahagia dengan cara yang
            lebih mudah dan profesional. Ikuti langkah-langkah berikut untuk
            melakukan pemesanan.
          </p>

          <div className="mt-12 space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white/90 shadow-md transition hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-gray-800"
                >
                  <span className="text-base md:text-lg">{step.title}</span>
                  {openIndex === i ? (
                    <ChevronUp className="h-6 w-6 text-pink-600 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500 transition-transform duration-300" />
                  )}
                </button>

                <div
                  ref={(el) => {
                    if (el) contentRefs.current[i] = el;
                  }}
                  className="overflow-hidden px-6"
                >
                  <ul className="list-disc space-y-2 pb-5 pl-6 text-sm text-gray-600 md:text-base">
                    {step.content.map((text, j) => (
                      <li key={j}>{text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowOrderForm(true)}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Pesan Sekarang</span>
            </button>
          </div>
        </div>
      </section>

      {/* Order Form Modal - Portal */}
      {showOrderForm && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/80 backdrop-blur-md overflow-y-auto p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl my-8 animate-slideUp">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-t-3xl">
              <h3 className="text-xl font-bold text-white">Form Pemesanan Undangan Digital</h3>
              <button
                onClick={() => setShowOrderForm(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[1, 2, 3, 4].map((step, index) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center w-full">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                        formStep >= step 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {formStep > step ? <Check className="h-5 w-5" /> : step}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${formStep >= step ? 'text-pink-600' : 'text-gray-500'}`}>
                        {step === 1 ? 'Pasangan' : step === 2 ? 'Acara' : step === 3 ? 'Paket' : 'Kontak'}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`h-1 flex-1 mx-2 transition-all ${
                        formStep > step ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              {!orderSuccess ? (
                <>
                  {/* Step 1 */}
                  {formStep === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Informasi Mempelai</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Mempelai Pria <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="groomName"
                          value={formData.groomName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Contoh: Ahmad Zaki"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Mempelai Wanita <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="brideName"
                          value={formData.brideName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Contoh: Siti Nurhaliza"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Orang Tua Mempelai Pria
                        </label>
                        <input
                          type="text"
                          name="groomParents"
                          value={formData.groomParents}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Contoh: Bapak H. Abdullah & Ibu Hj. Fatimah"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Orang Tua Mempelai Wanita
                        </label>
                        <input
                          type="text"
                          name="brideParents"
                          value={formData.brideParents}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Contoh: Bapak H. Muhammad & Ibu Hj. Aisyah"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {formStep === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Detail Acara Pernikahan</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tanggal Acara <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Waktu Acara <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="eventTime"
                            value={formData.eventTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lokasi Acara <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="eventLocation"
                          value={formData.eventLocation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Contoh: Gedung Pernikahan Melati"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alamat Lengkap <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="eventAddress"
                          value={formData.eventAddress}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {formStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Pilih Paket Undangan</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {packages.map((pkg) => (
                            <button
                              key={pkg.id}
                              onClick={() => setFormData({ ...formData, packageId: pkg.id })}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                formData.packageId === pkg.id
                                  ? 'border-pink-500 bg-pink-50 shadow-md scale-105'
                                  : 'border-gray-200 hover:border-pink-300 hover:shadow'
                              }`}
                            >
                              <h5 className="font-semibold text-gray-800 mb-1">{pkg.name}</h5>
                              <p className="text-sm text-pink-600 font-medium">
                                Rp {pkg.price.toLocaleString('id-ID')}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Pilih Template</h4>
                        <select
                          name="templateId"
                          value={formData.templateId}
                          onChange={(e) => setFormData({ ...formData, templateId: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                        >
                          {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 4 */}
                  {formStep === 4 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kontak</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="Nama pemesan"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nomor WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="08123456789"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catatan Tambahan
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Permintaan khusus atau catatan tambahan..."
                        />
                      </div>

                      {/* Summary */}
                      <div className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                        <h5 className="font-semibold text-gray-800 mb-3">Ringkasan Pesanan:</h5>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <span>Paket:</span>
                            <span className="font-medium">{selectedPackage?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Template:</span>
                            <span className="font-medium">{selectedTemplate?.name}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-pink-200">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-pink-600 text-lg">
                              Rp {selectedPackage?.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12 text-center animate-fadeIn">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center animate-bounce">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil Dikirim!</h4>
                  <p className="text-gray-600 mb-1">
                    Terima kasih atas pesanan Anda.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Kami akan segera menghubungi Anda melalui WhatsApp.
                  </p>
                  <p className="text-sm text-gray-500">
                    Form akan tertutup otomatis dalam beberapa detik...
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {!orderSuccess && (
              <div className="sticky bottom-0 px-6 py-4 border-t bg-gray-50 rounded-b-3xl flex justify-between gap-4">
                {formStep > 1 && (
                  <button
                    onClick={() => setFormStep(formStep - 1)}
                    className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all"
                  >
                    Kembali
                  </button>
                )}
                
                {formStep < 4 ? (
                  <button
                    onClick={() => setFormStep(formStep + 1)}
                    className="ml-auto px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Lanjutkan
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="ml-auto px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Memproses...</span>
                      </>
                    ) : (
                      'Kirim Pesanan'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
}