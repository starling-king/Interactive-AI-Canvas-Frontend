import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function ResumePreview({ resumeData }) {
  const resumeRef = useRef(null);

  if (!resumeData) return null;

  let data = {};
  try {
    data =
      typeof resumeData.generatedContent === "string"
        ? JSON.parse(resumeData.generatedContent)
        : resumeData.generatedContent;
  } catch (e) {
    return (
      <div className="p-4 font-bold text-red-500">
        Error parsing resume format.
      </div>
    );
  }

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${data.header?.name || "Resume"}_CV`,
    pageStyle: `
      @media print {
        @page { size: A4 portrait; margin: 12mm; }
        body { 
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important; 
          background-color: white !important; 
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    `,
  });

  const contactLinks = resumeData.customLinks || data.header?.links || {};

  return (
    <div className="relative flex flex-col items-center min-h-screen py-12 sm:py-20 bg-slate-50 dark:bg-[#040405] transition-colors duration-300 overflow-x-hidden">
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] pointer-events-none no-print" />

      <div className="sticky top-6 z-40 mb-10 gpu-layer animate-[slideDown_0.5s_ease-out] no-print">
        <div className="flex items-center gap-4 px-2 py-2 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <button
            onClick={() => handlePrint()}
            className="inline-flex items-center gap-2 px-6 py-2.5 font-bold text-white bg-primary-500 hover:bg-primary-600 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download ATS PDF
          </button>
        </div>
      </div>

      {/* 
        Responsive Scaling Wrapper 
        Scales the 210mm paper down via CSS to fit mobile screens perfectly.
      */}
      <div className="relative z-10 w-full flex justify-center overflow-hidden px-2 sm:px-0">
        <div className="w-[210mm] origin-top scale-[0.45] sm:scale-[0.7] md:scale-[0.8] lg:scale-100 transition-transform duration-300">
          {/* 
            THE PHYSICAL PAPER (Ivy League Format)
            Uses the ref required by react-to-print. 
            Strictly pure black text (#000000) for ATS parsers.
          */}
          <div
            ref={resumeRef}
            className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-[15mm] sm:p-[20mm] text-[#000000] font-sans leading-tight gpu-layer"
          >
            <header className="mb-4 text-center">
              <h1 className="text-3xl font-black tracking-wider uppercase mb-1">
                {data.header?.name}
              </h1>

              {resumeData.title && (
                <h2 className="text-[13px] font-bold tracking-widest uppercase mb-1.5 text-gray-800">
                  {resumeData.title}
                </h2>
              )}

              <div className="flex flex-wrap justify-center items-center text-[12px] font-medium gap-x-2">
                {data.header?.email && <span>{data.header.email}</span>}

                {Object.entries(contactLinks).map(([key, val], idx) => {
                  if (!val || String(val).trim() === "") return null;
                  const formattedUrl = val.startsWith("http")
                    ? val
                    : `https://${val}`;
                  const cleanDisplay = val.replace(/^https?:\/\/(www\.)?/, "");

                  return (
                    <React.Fragment key={key}>
                      <span className="text-gray-400 font-light">|</span>
                      <a
                        href={formattedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {cleanDisplay}
                      </a>
                    </React.Fragment>
                  );
                })}
              </div>
            </header>

            {data.skills && (
              <section className="mb-4">
                <h2 className="text-[13px] font-black tracking-widest uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                  Technical Skills
                </h2>
                <div className="text-[12px] space-y-1">
                  {data.skills.languages &&
                    data.skills.languages.length > 0 && (
                      <div className="flex items-start">
                        <span className="font-bold w-32.5 shrink-0">
                          Languages
                        </span>
                        <span className="mr-2 font-light text-gray-400">|</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data.skills.languages.join(", "),
                          }}
                        />
                      </div>
                    )}
                  {data.skills.frameworks &&
                    data.skills.frameworks.length > 0 && (
                      <div className="flex items-start">
                        <span className="font-bold w-32.5 shrink-0">
                          Frameworks & Libraries
                        </span>
                        <span className="mr-2 font-light text-gray-400">|</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data.skills.frameworks.join(", "),
                          }}
                        />
                      </div>
                    )}
                  {data.skills.tools && data.skills.tools.length > 0 && (
                    <div className="flex items-start">
                      <span className="font-bold w-32.5 shrink-0">
                        Tools & Infrastructure
                      </span>
                      <span className="mr-2 font-light text-gray-400">|</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: data.skills.tools.join(", "),
                        }}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {data.projects && data.projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-[13px] font-black tracking-widest uppercase border-b-[1.5px] border-black pb-0.5 mb-2.5">
                  Technical Projects
                </h2>
                <div className="space-y-3.5">
                  {data.projects.map((proj, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[13px] font-bold uppercase">
                          {proj.title}
                        </h3>
                        <span
                          className="text-[11px] font-bold text-gray-700 italic"
                          dangerouslySetInnerHTML={{ __html: proj.techStack }}
                        />
                      </div>
                      <ul className="pl-4 text-[12px] list-outside list-disc marker:text-black space-y-1">
                        {proj.bulletPoints?.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="pl-1 leading-snug"
                            dangerouslySetInnerHTML={{ __html: bullet }}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education && (
              <section className="mb-4 break-inside-avoid">
                <h2 className="text-[13px] font-black tracking-widest uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                  Education & Certifications
                </h2>
                <p className="text-[12px] font-semibold whitespace-pre-wrap leading-snug">
                  {data.education}
                </p>
              </section>
            )}

            {data.additionalSections && data.additionalSections.length > 0 && (
              <section>
                {data.additionalSections.map((sec, idx) => (
                  <div key={idx} className="mb-4 break-inside-avoid">
                    <h2 className="text-[13px] font-black tracking-widest uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                      {sec.title}
                    </h2>
                    {Array.isArray(sec.content) ? (
                      <ul className="pl-4 text-[12px] list-outside list-disc marker:text-black space-y-1">
                        {sec.content.map((item, cIdx) => (
                          <li
                            key={cIdx}
                            className="pl-1 leading-snug"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[12px] leading-snug">{sec.content}</p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
