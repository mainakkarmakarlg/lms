// import { extractSubjectChapterLosFromQuestion } from "../utils/quiz/extractSubjectChapterLosFromQuestion";

// const data = [
//   {
//     optionId: 109,
//     hasSubmitted: null,
//     attemptId: 13,
//     questionId: 67,
//     createdAt: "2025-02-22T08:28:47.067Z",
//     updatedAt: "2025-02-22T08:29:17.347Z ",
//     timeTaken: 2,
//     Question: {
//       id: 67,
//       question:
//         "In 2015, a company undertook the following two transactions:\nWith respect to required disclosures in the company's financial statements, which of the following is most accurate? If the company reports under: \n",
//       score: null,
//       averageTime: null,
//       difficulty: 5,
//       attachment: null,
//       questionId: null,
//       attribute: "Memory",
//       createdAt: "2025-02-22T08:07:08.657Z",
//       updatedAt: "2025-02-22T08:07:08.657Z",
//       Question: null,
//       Option: [
//         {
//           id: 108,
//           answer: "US GAAP, only the pledged borrowing must be disclosed. ",
//           attachment: null,
//           questionId: 67,
//         },
//         {
//           id: 109,
//           answer: "US GAAP, neither transaction must be disclosed. ",
//           attachment: null,
//           questionId: 67,
//         },
//         {
//           id: 110,
//           answer:
//             "International Financial Reporting Standards (IFRS), neither transaction must be disclosed.",
//           attachment: null,
//           questionId: 67,
//         },
//       ],
//       FallNumber: [
//         {
//           questionId: 67,
//           fallNumberId: 269,
//           FallNumber: {
//             id: 269,
//             number: "29CC1",
//             Subject: [
//               {
//                 id: 269,
//                 fallId: 269,
//                 subjectId: 329,
//                 Subject: {
//                   id: 329,
//                   name: "C. describe the importance of regulatory filings, financial statement notes and supplementary information, management’s commentary, and audit reports",
//                   order: null,
//                   type: "los",
//                   subjectId: 326,
//                   Subject: {
//                     id: 326,
//                     name: "29. Introduction to Financial Statement Analysis",
//                     order: null,
//                     type: "chapter",
//                     subjectId: 325,
//                     Subject: {
//                       id: 325,
//                       name: "Financial Statement Analysis",
//                       order: 3,
//                       type: "subject",
//                       subjectId: null,
//                       Subject: null,
//                     },
//                   },
//                 },
//               },
//               {
//                 id: 782,
//                 fallId: 269,
//                 subjectId: 973,
//                 Subject: {
//                   id: 973,
//                   name: "C. describe the importance of regulatory filings, financial statement notes and supplementary information, management’s commentary, and audit reports",
//                   order: null,
//                   type: "los",
//                   subjectId: 970,
//                   Subject: {
//                     id: 970,
//                     name: "27. Introduction to Financial Statement Analysis",
//                     order: null,
//                     type: "chapter",
//                     subjectId: 969,
//                     Subject: {
//                       id: 969,
//                       name: "Financial Statement Analysis",
//                       order: 3,
//                       type: "subject",
//                       subjectId: null,
//                       Subject: null,
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       ],
//     },
//   },
//   {
//     optionId: 119,
//     hasSubmitted: null,
//     attemptId: 13,
//     questionId: 70,
//     createdAt: "2025-02-22T08:28:47.067Z",
//     updatedAt: "2025-02-22T08:29:36.423Z",
//     timeTaken: null,
//     Question: {
//       id: 70,
//       question:
//         "Managementâs commentary (managementâs discussion and analysis) most likely incorporates:",
//       score: null,
//       averageTime: null,
//       difficulty: 1,
//       attachment: null,
//       questionId: null,
//       attribute: "Concept",
//       createdAt: "2025-02-22T08:07:09.137Z",
//       updatedAt: "2025-02-22T08:07:09.137Z",
//       Question: null,
//       Option: [
//         {
//           id: 117,
//           answer:
//             "An auditorâs opinion as to the fair presentation of the financial statements.",
//           attachment: null,
//           questionId: 70,
//         },
//         {
//           id: 118,
//           answer:
//             "A discussion of significant trends, events, and uncertainties that affect the operating results.",
//           attachment: null,
//           questionId: 70,
//         },
//         {
//           id: 119,
//           answer:
//             "Supplementary information about accounting policies, methods, and estimates.",
//           attachment: null,
//           questionId: 70,
//         },
//       ],
//       FallNumber: [
//         {
//           questionId: 70,
//           fallNumberId: 269,
//           FallNumber: {
//             id: 269,
//             number: "29CC1",
//             Subject: [
//               {
//                 id: 269,
//                 fallId: 269,
//                 subjectId: 329,
//                 Subject: {
//                   id: 329,
//                   name: "C. describe the importance of regulatory filings, financial statement notes and supplementary information, management’s commentary, and audit reports",
//                   order: null,
//                   type: "los",
//                   subjectId: 326,
//                   Subject: {
//                     id: 326,
//                     name: "29. Introduction to Financial Statement Analysis",
//                     order: null,
//                     type: "chapter",
//                     subjectId: 325,
//                     Subject: {
//                       id: 325,
//                       name: "Financial Statement Analysis",
//                       order: 3,
//                       type: "subject",
//                       subjectId: null,
//                       Subject: null,
//                     },
//                   },
//                 },
//               },
//               {
//                 id: 782,
//                 fallId: 269,
//                 subjectId: 973,
//                 Subject: {
//                   id: 973,
//                   name: "C. describe the importance of regulatory filings, financial statement notes and supplementary information, management’s commentary, and audit reports",
//                   order: null,
//                   type: "los",
//                   subjectId: 970,
//                   Subject: {
//                     id: 970,
//                     name: "27. Introduction to Financial Statement Analysis",
//                     order: null,
//                     type: "chapter",
//                     subjectId: 969,
//                     Subject: {
//                       id: 969,
//                       name: "Financial Statement Analysis",
//                       order: 3,
//                       type: "subject",
//                       subjectId: null,
//                       Subject: null,
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       ],
//     },
//   },
//   {
//     optionId: 177,
//     hasSubmitted: null,
//     attemptId: 13,
//     questionId: 90,
//     createdAt: "2025-02-22T08:28:47.067Z",
//     updatedAt: "2025-02-22T08:29:41.867Z",
//     timeTaken: null,
//     Question: {
//       id: 90,
//       question:
//         '<p>\n    At the start of the year, a company that uses U.S. GAAP entered a contract to design and build a bridge with the following terms:\n</p>\n<figure class="table" style="width:38.41%;">\n    <table class="ck-table-resized">\n        <colgroup><col style="width:60%;"><col style="width:40%;"></colgroup>\n        <tbody>\n            <tr>\n                <td style="border-bottom-width:1.5pt;border-color:#666666;border-left-width:1.0pt;border-right-width:1.0pt;border-top-width:1.0pt;height:14.45pt;padding:0cm 5.4pt;vertical-align:top;width:82.06%;" width="82%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">Contract length&nbsp;</span></span>\n                    </p>\n                </td>\n                <td style="border-bottom:1.5pt solid #666666;border-left-style:none;border-right:1.0pt solid #666666;border-top:1.0pt solid #666666;height:14.45pt;padding:0cm 5.4pt;vertical-align:top;width:17.94%;" width="17%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr"><strong>&nbsp;3 years&nbsp;</strong></span></span>\n                    </p>\n                </td>\n            </tr>\n            <tr>\n                <td style="background-color:#CCCCCC;border-bottom-style:solid;border-color:#666666;border-left-style:solid;border-right-style:solid;border-top-style:none;border-width:1.0pt;height:3.1pt;padding:0cm 5.4pt;vertical-align:top;width:82.06%;" width="82%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">&nbsp;Fixed contract price&nbsp;</span></span>\n                    </p>\n                </td>\n                <td style="background-color:#CCCCCC;border-bottom:1.0pt solid #666666;border-left-style:none;border-right:1.0pt solid #666666;border-top-style:none;height:3.1pt;padding:0cm 5.4pt;vertical-align:top;width:17.94%;" width="17%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">&nbsp;$400 million</span></span>\n                    </p>\n                </td>\n            </tr>\n            <tr>\n                <td style="border-bottom-style:solid;border-color:#666666;border-left-style:solid;border-right-style:solid;border-top-style:none;border-width:1.0pt;height:3.6pt;padding:0cm 5.4pt;vertical-align:top;width:82.06%;" width="82%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">&nbsp;Estimated contract cost&nbsp;</span></span>\n                    </p>\n                </td>\n                <td style="border-bottom:1.0pt solid #666666;border-left-style:none;border-right:1.0pt solid #666666;border-top-style:none;height:3.6pt;padding:0cm 5.4pt;vertical-align:top;width:17.94%;" width="17%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">&nbsp;$320 million</span></span>\n                    </p>\n                </td>\n            </tr>\n            <tr>\n                <td style="background-color:#CCCCCC;border-bottom-style:solid;border-color:#666666;border-left-style:solid;border-right-style:solid;border-top-style:none;border-width:1.0pt;height:13.3pt;padding:0cm 5.4pt;vertical-align:top;width:82.06%;" width="82%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">&nbsp;Costs incurred in first year&nbsp;</span></span>\n                    </p>\n                </td>\n                <td style="background-color:#CCCCCC;border-bottom:1.0pt solid #666666;border-left-style:none;border-right:1.0pt solid #666666;border-top-style:none;height:13.3pt;padding:0cm 5.4pt;vertical-align:top;width:17.94%;" width="17%">\n                    <p style="line-height:normal;margin:0cm 0cm 0cm 7.1pt;text-align:justify;text-justify:inter-ideograph;">\n                        <span style="color:black;font-family:&quot;Tw Cen MT&quot;,sans-serif;font-size:10.5pt;"><span lang="EN-MY" dir="ltr">&nbsp;$120 million</span></span>\n                    </p>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</figure>\n<p>\n    The company was initially quite certain about its cost estimates and intended to recognize revenue based on them. However, unexpected problems during the first year have caused engineers to suggest that a more expensive design may be required, costing up to $80 million more. If the appropriate design cannot be determined before the company\'s financial statements are issued, the difference in the amount of revenue the company would recognize is closest to:\n</p>',
//       score: null,
//       averageTime: null,
//       difficulty: 5,
//       attachment: null,
//       questionId: null,
//       attribute: "Numerical",
//       createdAt: "2025-02-22T08:07:13.077Z",
//       updatedAt: "2025-02-22T08:07:13.077Z",
//       Question: null,
//       Option: [
//         {
//           id: 177,
//           answer: "150 mn",
//           attachment: null,
//           questionId: 90,
//         },
//         {
//           id: 178,
//           answer: "$0",
//           attachment: null,
//           questionId: 90,
//         },
//         {
//           id: 179,
//           answer: "$ 400 mn",
//           attachment: null,
//           questionId: 90,
//         },
//       ],
//       FallNumber: [
//         {
//           questionId: 90,
//           fallNumberId: 272,
//           FallNumber: {
//             id: 272,
//             number: "30AC1",
//             Subject: [
//               {
//                 id: 272,
//                 fallId: 272,
//                 subjectId: 333,
//                 Subject: {
//                   id: 333,
//                   name: "A. describe general principles of revenue recognition, specific revenue recognition applications, and implications of revenue recognition choices for financial analysis",
//                   order: null,
//                   type: "los",
//                   subjectId: 332,
//                   Subject: {
//                     id: 332,
//                     name: "30. Analyzing Income Statements",
//                     order: null,
//                     type: "chapter",
//                     subjectId: 325,
//                     Subject: {
//                       id: 325,
//                       name: "Financial Statement Analysis",
//                       order: 3,
//                       type: "subject",
//                       subjectId: null,
//                       Subject: null,
//                     },
//                   },
//                 },
//               },
//               {
//                 id: 785,
//                 fallId: 272,
//                 subjectId: 977,
//                 Subject: {
//                   id: 977,
//                   name: "A. describe general principles of revenue recognition, specific revenue recognition applications, and implications of revenue recognition choices for financial analysis",
//                   order: null,
//                   type: "los",
//                   subjectId: 976,
//                   Subject: {
//                     id: 976,
//                     name: "28. Analyzing Income Statements",
//                     order: null,
//                     type: "chapter",
//                     subjectId: 969,
//                     Subject: {
//                       id: 969,
//                       name: "Financial Statement Analysis",
//                       order: 3,
//                       type: "subject",
//                       subjectId: null,
//                       Subject: null,
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       ],
//     },
//   },
// ];

// const subjects = [];

// for (let i = 0; i < data?.length; i++) {
//   const subjectData = data[i]?.Question?.FallNumber[0]?.FallNumber?.Subject[0];
//   const belongingsData = extractSubjectChapterLosFromQuestion(subjectData);
//   const topicExits = subjects.find(
//     (subject) => subject.id === belongingsData.subject.id
//   )
// }
