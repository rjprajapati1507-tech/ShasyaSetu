// Centralized translations for MandiSetu/ShasyaSetu.
// Add new UI text here (not inline in components) so every string stays
// translated consistently across all three languages.

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
];

const dict = {
  // ---------- Common / brand ----------
  appName: { en: 'ShasyaSetu', hi: 'शस्यसेतु', mr: 'शस्यसेतू' },
  appTagline: { en: 'Farm to buyer, transparently', hi: 'खेत से खरीदार तक, पारदर्शी तरीके से', mr: 'शेतापासून खरेदीदारापर्यंत, पारदर्शकपणे' },
  demoBuild: { en: 'DEMO BUILD', hi: 'डेमो वर्शन', mr: 'डेमो आवृत्ती' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', mr: 'रद्द करा' },
  submit: { en: 'Submit', hi: 'जमा करें', mr: 'सबमिट करा' },
  skip: { en: 'Skip', hi: 'छोड़ें', mr: 'वगळा' },
  close: { en: 'Close', hi: 'बंद करें', mr: 'बंद करा' },

  // ---------- Role switch / top bar ----------
  fpoPortal: { en: 'FPO / Farmer portal', hi: 'किसान / FPO पोर्टल', mr: 'शेतकरी / FPO पोर्टल' },
  buyerPortal: { en: 'Buyer portal', hi: 'खरीदार पोर्टल', mr: 'खरेदीदार पोर्टल' },
  fpoOrgLine: { en: '12 members · Nashik dist.', hi: '12 सदस्य · नासिक ज़िला', mr: '12 सदस्य · नाशिक जिल्हा' },
  verifiedBuyerLine: { en: 'Verified buyer', hi: 'सत्यापित खरीदार', mr: 'सत्यापित खरेदीदार' },
  language: { en: 'Language', hi: 'भाषा', mr: 'भाषा' },
  portal: { en: 'Choose portal', hi: 'पोर्टल चुनें', mr: 'पोर्टल निवडा' },
  primaryNavigation: { en: 'Primary navigation', hi: 'मुख्य नेविगेशन', mr: 'मुख्य नेव्हिगेशन' },
  workspaceMenu: { en: 'Workspace', hi: 'कार्यस्थान', mr: 'कार्यस्थान' },
  secureWorkspace: { en: 'Your workspace at a glance', hi: 'आपका कार्यस्थान', mr: 'तुमचे कार्यस्थान' },

  // ---------- Sidebar nav ----------
  navPriceIntel: { en: 'Price intelligence', hi: 'भाव जानकारी', mr: 'भाव माहिती' },
  navMyLots: { en: 'My lots', hi: 'मेरी उपज', mr: 'माझा माल' },
  navOffers: { en: 'Offers', hi: 'प्रस्ताव', mr: 'ऑफर्स' },
  navOrders: { en: 'Orders & payments', hi: 'ऑर्डर व भुगतान', mr: 'ऑर्डर व पेमेंट' },
  navHelp: { en: 'Voice / WhatsApp line', hi: 'फ़ोन / व्हाट्सऐप सहायता', mr: 'फोन / व्हॉट्सअॅप मदत' },
  navMarketplace: { en: 'Marketplace', hi: 'बाज़ार', mr: 'बाजारपेठ' },
  navMyOffers: { en: 'My offers', hi: 'मेरे प्रस्ताव', mr: 'माझ्या ऑफर्स' },
  sidebarSupport: { en: 'Support', hi: 'सहायता', mr: 'मदत' },

  // ---------- Price Intelligence: hero ----------
  piBrand: { en: '✦ ShasyaSetu', hi: '✦ शस्यसेतु', mr: '✦ शस्यसेतू' },
  piHeadline: { en: 'Better market decisions, grounded in clear calculations.', hi: 'सही हिसाब पर आधारित, बेहतर बाज़ार का फैसला।', mr: 'योग्य हिशोबावर आधारित, चांगला बाजार निर्णय.' },
  piSub: { en: 'AI-powered agricultural market intelligence for a focused, demo-ready selling recommendation.', hi: 'फसल बेचने का सही फैसला लेने में मदद करने वाली AI आधारित बाज़ार जानकारी।', mr: 'पीक विकण्याचा योग्य निर्णय घेण्यासाठी मदत करणारी AI आधारित बाजार माहिती.' },
  piBadge: { en: 'Prototype using demo/sample market data — not live data', hi: 'यह डेमो/नमूना डेटा है — असली लाइव डेटा नहीं', mr: 'हा डेमो/नमुना डेटा आहे — खरा लाइव्ह डेटा नाही' },
  piWorkflowInput: { en: 'Farmer input', hi: 'किसान की जानकारी', mr: 'शेतकऱ्याची माहिती' },
  piWorkflowPredict: { en: 'Price prediction', hi: 'भाव अनुमान', mr: 'भाव अंदाज' },
  piWorkflowNet: { en: 'Net realisation', hi: 'शुद्ध आय', mr: 'निव्वळ उत्पन्न' },
  piWorkflowRank: { en: 'Market ranking', hi: 'मंडी रैंकिंग', mr: 'बाजार क्रमवारी' },

  // ---------- Farmer input form ----------
  step1: { en: 'Step 1', hi: 'चरण 1', mr: 'पायरी 1' },
  farmerInput: { en: 'Farmer input', hi: 'अपनी फसल की जानकारी दें', mr: 'तुमच्या पिकाची माहिती द्या' },
  farmerInputDesc: { en: 'Tell us what you want to sell and where you are located.', hi: 'आप क्या बेचना चाहते हैं और आप कहाँ हैं, यह बताएं।', mr: 'तुम्हाला काय विकायचे आहे आणि तुम्ही कुठे आहात हे सांगा.' },
  labelCrop: { en: 'Crop', hi: 'फसल', mr: 'पीक' },
  labelQuantityKg: { en: 'Quantity (kg)', hi: 'मात्रा (किलो)', mr: 'प्रमाण (किलो)' },
  labelFarmerLocation: { en: 'Farmer location', hi: 'आपका स्थान', mr: 'तुमचे ठिकाण' },
  getRecommendation: { en: 'Get recommendation', hi: 'सलाह पाएं', mr: 'सल्ला मिळवा' },
  findingMarkets: { en: 'Finding markets…', hi: 'मंडी खोजी जा रही है…', mr: 'बाजार शोधले जात आहे…' },
  piNote: { en: 'Demo currently supports the sample route from Nashik.', hi: 'यह डेमो फिलहाल नासिक से जुड़े नमूना मार्ग को ही दिखाता है।', mr: 'हा डेमो सध्या नाशिकहून जोडलेला नमुना मार्गच दाखवतो.' },
  fetchingRecommendation: { en: 'Fetching recommendation from the ShasyaSetu API…', hi: 'शस्यसेतु से सलाह लाई जा रही है…', mr: 'शस्यसेतूकडून सल्ला आणला जात आहे…' },
  recommendationUnavailable: { en: 'Recommendation unavailable —', hi: 'सलाह अभी उपलब्ध नहीं है —', mr: 'सल्ला सध्या उपलब्ध नाही —' },

  // ---------- Best selling option / recommended market ----------
  bestSellingOption: { en: 'BEST SELLING OPTION', hi: 'सबसे अच्छा विकल्प', mr: 'सर्वोत्तम पर्याय' },
  recommendedMarket: { en: 'Recommended market', hi: 'सुझाई गई मंडी', mr: 'शिफारस केलेली बाजारपेठ' },
  recommendedMarketDesc: { en: 'It has the highest expected net realisation after the sample transport and handling costs are deducted.', hi: 'ढुलाई और अन्य खर्च घटाने के बाद यहाँ सबसे ज़्यादा शुद्ध आय मिलने की उम्मीद है।', mr: 'वाहतूक व इतर खर्च वजा केल्यावर इथे सर्वाधिक निव्वळ उत्पन्न मिळण्याची शक्यता आहे.' },
  expectedPricePerKg: { en: 'Expected price / kg', hi: 'संभावित भाव / किलो', mr: 'अपेक्षित भाव / किलो' },
  transportPerKg: { en: 'Transport / kg', hi: 'ढुलाई / किलो', mr: 'वाहतूक / किलो' },
  expectedNetPerKg: { en: 'Expected net / kg', hi: 'शुद्ध आय / किलो', mr: 'निव्वळ उत्पन्न / किलो' },

  // ---------- Realisation calculation ----------
  calculation: { en: 'Calculation', hi: 'हिसाब', mr: 'हिशोब' },
  expectedNetRealisation: { en: 'Expected net realisation', hi: 'संभावित शुद्ध आय', mr: 'अपेक्षित निव्वळ उत्पन्न' },
  expectedSellingPrice: { en: 'Expected selling price', hi: 'संभावित बिक्री भाव', mr: 'अपेक्षित विक्री भाव' },
  transportCost: { en: '− Transportation cost', hi: '− ढुलाई खर्च', mr: '− वाहतूक खर्च' },
  handlingCost: { en: '− Relevant costs', hi: '− अन्य खर्च', mr: '− इतर खर्च' },
  netRealisationEquals: { en: '= Expected net realisation', hi: '= संभावित शुद्ध आय', mr: '= अपेक्षित निव्वळ उत्पन्न' },

  // ---------- Selling decision (sell now / wait) ----------
  sellingDecision: { en: 'Selling decision', hi: 'बेचने का फैसला', mr: 'विक्रीचा निर्णय' },
  sellingDecisionUnavailableTitle: { en: 'Sell now / wait guidance not available yet', hi: 'अभी बेचें या इंतज़ार करें — यह सलाह अभी उपलब्ध नहीं है', mr: 'आता विका की थांबा — हा सल्ला सध्या उपलब्ध नाही' },
  sellingDecisionUnavailableDesc: { en: 'This prototype does not yet forecast future prices, so ShasyaSetu cannot responsibly tell you whether to sell now or wait. It only compares markets for today\u2019s sample prices.', hi: 'यह डेमो अभी भविष्य के भाव का अनुमान नहीं लगाता, इसलिए शस्यसेतु अभी यह नहीं बता सकता कि अभी बेचें या इंतज़ार करें। यह सिर्फ आज के नमूना भावों पर मंडियों की तुलना करता है।', mr: 'हा डेमो अजून भविष्यातील भावाचा अंदाज लावत नाही, त्यामुळे शस्यसेतू आत्ता हे सांगू शकत नाही की आता विकावे की थांबावे. हे फक्त आजच्या नमुना भावांवरून बाजारांची तुलना करते.' },

  // ---------- Market comparison / ranking ----------
  step2: { en: 'Step 2', hi: 'चरण 2', mr: 'पायरी 2' },
  marketComparison: { en: 'Market comparison', hi: 'मंडी तुलना', mr: 'बाजार तुलना' },
  marketComparisonDesc: { en: 'Markets are ranked by expected net realisation for {qty} kg. The recommendation above is a starting point — you can select any market below.', hi: '{qty} किलो के लिए संभावित शुद्ध आय के अनुसार मंडियां क्रम में हैं। ऊपर दी गई सलाह एक शुरुआत है — आप नीचे से कोई भी मंडी चुन सकते हैं।', mr: '{qty} किलोसाठी अपेक्षित निव्वळ उत्पन्नानुसार बाजारांची क्रमवारी लावली आहे. वरील सल्ला ही सुरुवात आहे — तुम्ही खाली दिलेल्या कोणत्याही बाजाराची निवड करू शकता.' },
  colMarket: { en: 'Market', hi: 'मंडी', mr: 'बाजार' },
  colExpectedPrice: { en: 'Expected price', hi: 'संभावित भाव', mr: 'अपेक्षित भाव' },
  colTransportCost: { en: 'Transport cost', hi: 'ढुलाई खर्च', mr: 'वाहतूक खर्च' },
  colNetRealisation: { en: 'Expected net realisation', hi: 'संभावित शुद्ध आय', mr: 'अपेक्षित निव्वळ उत्पन्न' },
  colAction: { en: 'Action', hi: 'कार्रवाई', mr: 'कृती' },
  tagRecommended: { en: 'Recommended', hi: 'सुझाया गया', mr: 'शिफारस केलेले' },
  selectMarket: { en: 'Select market', hi: 'यह मंडी चुनें', mr: 'हा बाजार निवडा' },
  selected: { en: '✓ Selected', hi: '✓ चुना गया', mr: '✓ निवडले' },

  // ---------- Selected market / continue to lot ----------
  step3: { en: 'Step 3', hi: 'चरण 3', mr: 'पायरी 3' },
  selectedMarketLabel: { en: 'Selected market:', hi: 'चुनी गई मंडी:', mr: 'निवडलेला बाजार:' },
  continueToCreateLot: { en: 'Continue to Create Lot', hi: 'आगे बढ़ें — उपज दर्ज करें', mr: 'पुढे जा — माल नोंदवा' },

  // ---------- My Lots ----------
  myLotsTitle: { en: 'My lots', hi: 'मेरी उपज', mr: 'माझा माल' },
  myLotsDesc: { en: 'Create a lot to list your crop and reach verified buyers.', hi: 'अपनी फसल सूचीबद्ध करने और सत्यापित खरीदारों तक पहुँचने के लिए एक लॉट बनाएं।', mr: 'तुमचे पीक नोंदवण्यासाठी आणि सत्यापित खरेदीदारांपर्यंत पोहोचण्यासाठी लॉट तयार करा.' },
  createNewLot: { en: '＋ Create new lot', hi: '＋ नई उपज दर्ज करें', mr: '＋ नवीन माल नोंदवा' },
  noLotsTitle: { en: 'No lots yet', hi: 'अभी कोई उपज दर्ज नहीं है', mr: 'अजून कोणताही माल नोंदवलेला नाही' },
  noLotsDesc: { en: 'Create your first lot to reach verified buyers.', hi: 'सत्यापित खरीदारों तक पहुँचने के लिए अपनी पहली उपज दर्ज करें।', mr: 'सत्यापित खरेदीदारांपर्यंत पोहोचण्यासाठी तुमचा पहिला माल नोंदवा.' },
  sampleDemoLot: { en: 'Sample/demo lot', hi: 'नमूना/डेमो उपज', mr: 'नमुना/डेमो माल' },
  askingPrice: { en: 'Asking price', hi: 'माँगा गया भाव', mr: 'मागितलेला भाव' },
  offersReceived: { en: 'Offers received', hi: 'मिले प्रस्ताव', mr: 'मिळालेल्या ऑफर्स' },
  estValue: { en: 'Est. value', hi: 'अनुमानित कीमत', mr: 'अंदाजे किंमत' },
  fromRecommendation: { en: 'Created from a ShasyaSetu recommendation — expected net realisation {value}/kg (sample data).', hi: 'शस्यसेतु की सलाह से बनाई गई — संभावित शुद्ध आय {value}/किलो (नमूना डेटा)।', mr: 'शस्यसेतूच्या सल्ल्यावरून तयार केले — अपेक्षित निव्वळ उत्पन्न {value}/किलो (नमुना डेटा).' },
  waitingForOffers: { en: '💡 Waiting for buyer offers — visible to all {count} verified buyers on the marketplace.', hi: '💡 खरीदार के प्रस्ताव का इंतज़ार है — बाज़ार में सभी {count} सत्यापित खरीदारों को दिखेगा।', mr: '💡 खरेदीदाराच्या ऑफरची वाट पाहत आहे — बाजारपेठेतील सर्व {count} सत्यापित खरेदीदारांना दिसेल.' },

  // ---------- Offers (FPO side) ----------
  offersTitle: { en: 'Offers from buyers', hi: 'खरीदारों के प्रस्ताव', mr: 'खरेदीदारांच्या ऑफर्स' },
  offersDesc: { en: 'Review, negotiate or accept digital offers on your listed lots.', hi: 'अपनी सूचीबद्ध उपज पर आए प्रस्तावों को देखें और स्वीकार करें।', mr: 'तुमच्या नोंदवलेल्या मालावर आलेल्या ऑफर्स पहा आणि स्वीकारा.' },
  noOffersTitle: { en: 'No pending offers', hi: 'अभी कोई प्रस्ताव नहीं है', mr: 'सध्या कोणतीही ऑफर नाही' },
  noOffersDesc: { en: 'When a buyer makes an offer on your lot, it will show up here.', hi: 'जब कोई खरीदार आपकी उपज पर प्रस्ताव देगा, वह यहाँ दिखेगा।', mr: 'जेव्हा एखादा खरेदीदार तुमच्या मालावर ऑफर देईल, ती इथे दिसेल.' },
  yourAsk: { en: 'Your ask:', hi: 'आपका भाव:', mr: 'तुमचा भाव:' },
  listed: { en: 'listed', hi: 'दर्ज', mr: 'नोंदवलेले' },
  verifiedTag: { en: '✓ Verified', hi: '✓ सत्यापित', mr: '✓ सत्यापित' },
  sampleBuyerData: { en: '(sample buyer data)', hi: '(नमूना खरीदार डेटा)', mr: '(नमुना खरेदीदार डेटा)' },
  accept: { en: 'Accept', hi: 'स्वीकार करें', mr: 'स्वीकारा' },
  decline: { en: 'Decline', hi: 'अस्वीकार करें', mr: 'नाकारा' },

  // ---------- Orders & payments ----------
  ordersTitle: { en: 'Orders & payments', hi: 'ऑर्डर व भुगतान', mr: 'ऑर्डर व पेमेंट' },
  ordersDescFpo: { en: 'Track escrow status, logistics and payment release for locked deals.', hi: 'तय हो चुके सौदों की एस्क्रो स्थिति, परिवहन और भुगतान की जानकारी देखें।', mr: 'निश्चित झालेल्या व्यवहारांची एस्क्रो स्थिती, वाहतूक व पेमेंटची माहिती पहा.' },
  ordersDescBuyer: { en: 'Escrow-protected orders — your payment is held safely until delivery is confirmed.', hi: 'एस्क्रो-सुरक्षित ऑर्डर — डिलीवरी पक्की होने तक आपका भुगतान सुरक्षित रहता है।', mr: 'एस्क्रो-संरक्षित ऑर्डर — डिलिव्हरी निश्चित होईपर्यंत तुमचे पेमेंट सुरक्षित राहते.' },
  noOrdersTitle: { en: 'No active orders', hi: 'अभी कोई सक्रिय ऑर्डर नहीं है', mr: 'सध्या कोणतीही सक्रिय ऑर्डर नाही' },
  noOrdersDesc: { en: 'Orders appear here once a deal is locked and escrow is funded (simulated escrow — no real payment moves).', hi: 'सौदा तय होते ही और एस्क्रो में राशि जमा होते ही ऑर्डर यहाँ दिखेगी (यह नकली एस्क्रो है — असली भुगतान नहीं होता)।', mr: 'व्यवहार निश्चित होताच आणि एस्क्रोमध्ये रक्कम जमा होताच ऑर्डर इथे दिसेल (हे नकली एस्क्रो आहे — खरे पेमेंट होत नाही).' },
  simulatedEscrowNote: { en: 'Simulated escrow for this demo — no real payment is held or transferred.', hi: 'यह डेमो के लिए नकली एस्क्रो है — कोई असली भुगतान रोका या भेजा नहीं जाता।', mr: 'हे डेमोसाठी नकली एस्क्रो आहे — कोणतेही खरे पेमेंट रोखले किंवा पाठवले जात नाही.' },
  markAs: { en: 'Mark:', hi: 'अपडेट करें:', mr: 'अपडेट करा:' },
  rateThisDeal: { en: 'Rate this deal', hi: 'इस सौदे को रेट करें', mr: 'या व्यवहाराला रेट करा' },
  ratedComplete: { en: '✓ Rated & complete', hi: '✓ रेट किया गया व पूरा', mr: '✓ रेट केले व पूर्ण' },
  paymentFrozen: { en: 'Payment frozen — grievance under review', hi: 'भुगतान रोका गया — शिकायत की समीक्षा हो रही है', mr: 'पेमेंट थांबवले — तक्रारीचा आढावा सुरू आहे' },
  raiseGrievance: { en: 'Raise grievance', hi: 'शिकायत दर्ज करें', mr: 'तक्रार नोंदवा' },
  disputeRaised: { en: 'Dispute raised', hi: 'शिकायत दर्ज हुई', mr: 'तक्रार नोंदवली' },

  // Timeline steps
  stepEscrowFunded: { en: 'Escrow funded', hi: 'एस्क्रो में राशि जमा', mr: 'एस्क्रोमध्ये रक्कम जमा' },
  stepPickedUp: { en: 'Picked up', hi: 'उठाव हुआ', mr: 'उचल झाली' },
  stepInTransit: { en: 'In transit', hi: 'रास्ते में', mr: 'मार्गात' },
  stepDelivered: { en: 'Delivered', hi: 'डिलीवर हुआ', mr: 'डिलिव्हर झाले' },
  stepPaymentReleased: { en: 'Payment released', hi: 'भुगतान जारी हुआ', mr: 'पेमेंट जारी झाले' },

  // ---------- Marketplace (buyer) ----------
  marketplaceTitle: { en: 'Marketplace', hi: 'बाज़ार', mr: 'बाजारपेठ' },
  marketplaceDesc: { en: 'Browse verified lots from farmers and FPOs near you.', hi: 'अपने पास के किसानों और FPO की सत्यापित उपज देखें।', mr: 'तुमच्या जवळील शेतकरी व FPO यांचा सत्यापित माल पहा.' },
  filterAll: { en: 'All', hi: 'सभी', mr: 'सर्व' },
  noMatchTitle: { en: 'No lots match this filter', hi: 'इस फ़िल्टर से कोई उपज नहीं मिली', mr: 'या फिल्टरशी जुळणारा माल नाही' },
  noMatchDesc: { en: 'Try a different crop filter.', hi: 'कोई और फसल फ़िल्टर आज़माएं।', mr: 'दुसरे पीक फिल्टर वापरून पहा.' },
  available: { en: 'Available', hi: 'उपलब्ध', mr: 'उपलब्ध' },
  totalValue: { en: 'Total value', hi: 'कुल कीमत', mr: 'एकूण किंमत' },
  makeAnOffer: { en: 'Make an offer', hi: 'प्रस्ताव भेजें', mr: 'ऑफर पाठवा' },

  // ---------- My offers (buyer) ----------
  myOffersTitle: { en: 'My offers', hi: 'मेरे प्रस्ताव', mr: 'माझ्या ऑफर्स' },
  myOffersDesc: { en: "Offers you've sent, awaiting the seller's response.", hi: 'आपके भेजे गए प्रस्ताव — विक्रेता के जवाब का इंतज़ार है।', mr: 'तुम्ही पाठवलेल्या ऑफर्स — विक्रेत्याच्या उत्तराची वाट पाहत आहे.' },
  noOffersSentTitle: { en: 'No offers sent yet', hi: 'अभी कोई प्रस्ताव नहीं भेजा गया', mr: 'अजून कोणतीही ऑफर पाठवलेली नाही' },
  noOffersSentDesc: { en: 'Go to the marketplace and make an offer on a lot.', hi: 'बाज़ार में जाएं और किसी उपज पर प्रस्ताव भेजें।', mr: 'बाजारपेठेत जा आणि एखाद्या मालावर ऑफर पाठवा.' },
  yourOffer: { en: 'your offer', hi: 'आपका प्रस्ताव', mr: 'तुमची ऑफर' },
  statusPending: { en: 'Pending', hi: 'लंबित', mr: 'प्रलंबित' },
  statusAccepted: { en: 'Accepted', hi: 'स्वीकृत', mr: 'स्वीकृत' },
  statusRejected: { en: 'Rejected', hi: 'अस्वीकृत', mr: 'नाकारले' },

  // ---------- Help ----------
  helpTitle: { en: 'Voice & WhatsApp access', hi: 'फ़ोन व व्हाट्सऐप सहायता', mr: 'फोन व व्हॉट्सअॅप मदत' },
  helpDesc: { en: 'For members without a smartphone, or who prefer speaking in their own language.', hi: 'जिनके पास स्मार्टफ़ोन नहीं है, या जो अपनी भाषा में बात करना चाहते हैं, उनके लिए।', mr: 'ज्यांच्याकडे स्मार्टफोन नाही, किंवा जे स्वतःच्या भाषेत बोलणे पसंत करतात, त्यांच्यासाठी.' },
  helpIvrTitle: { en: '📞 Toll-free IVR', hi: '📞 टोल-फ्री फ़ोन सेवा', mr: '📞 टोल-फ्री फोन सेवा' },
  helpIvrDesc: { en: "Call {number} — press 1 for today's price, press 2 to list a crop, press 3 to speak to your FPO coordinator.", hi: '{number} पर कॉल करें — आज का भाव जानने के लिए 1 दबाएं, फसल दर्ज करने के लिए 2 दबाएं, FPO समन्वयक से बात करने के लिए 3 दबाएं।', mr: '{number} वर कॉल करा — आजचा भाव जाणून घेण्यासाठी 1 दाबा, पीक नोंदवण्यासाठी 2 दाबा, FPO समन्वयकाशी बोलण्यासाठी 3 दाबा.' },
  helpWhatsappTitle: { en: '💬 WhatsApp bot', hi: '💬 व्हाट्सऐप सेवा', mr: '💬 व्हॉट्सअॅप सेवा' },
  helpWhatsappDesc: { en: 'Send a voice note or crop photo to {number} — get price and matched buyers as a voice reply.', hi: '{number} पर आवाज़ का संदेश या फसल की फ़ोटो भेजें — भाव और मिलते-जुलते खरीदार आवाज़ में जवाब मिलेगा।', mr: '{number} वर आवाजाचा संदेश किंवा पिकाचा फोटो पाठवा — भाव व जुळणारे खरेदीदार आवाजात उत्तर मिळेल.' },
  helpKioskTitle: { en: '🏢 Village kiosk (CSC)', hi: '🏢 गाँव का कियोस्क (CSC)', mr: '🏢 गावातील कियोस्क (CSC)' },
  helpKioskDesc: { en: 'Visit your nearest Common Service Centre — the operator lists your crop on this portal for you.', hi: 'अपने नज़दीकी कॉमन सर्विस सेंटर पर जाएं — वहाँ का संचालक आपकी फसल इस पोर्टल पर दर्ज कर देगा।', mr: 'तुमच्या जवळच्या कॉमन सर्व्हिस सेंटरला भेट द्या — तिथला संचालक तुमचे पीक या पोर्टलवर नोंदवेल.' },
  helpDisclaimer: { en: 'These channels are illustrative for the demo — no real telephony or messaging integration is connected.', hi: 'ये सुविधाएं सिर्फ डेमो के लिए दिखाई गई हैं — इनसे असली फ़ोन या मैसेजिंग सेवा नहीं जुड़ी है।', mr: 'या सुविधा फक्त डेमोसाठी दाखवल्या आहेत — यांच्याशी खरी फोन किंवा मेसेजिंग सेवा जोडलेली नाही.' },

  // ---------- Create lot modal ----------
  createLotTitle: { en: 'Create a new lot', hi: 'नई उपज दर्ज करें', mr: 'नवीन माल नोंदवा' },
  createLotSub: { en: 'This lot becomes visible to verified buyers immediately.', hi: 'यह उपज तुरंत सत्यापित खरीदारों को दिखने लगेगी।', mr: 'हा माल लगेच सत्यापित खरेदीदारांना दिसू लागेल.' },
  labelQuantityQuintal: { en: 'Quantity (quintals)', hi: 'मात्रा (क्विंटल)', mr: 'प्रमाण (क्विंटल)' },
  labelMarketSample: { en: 'Market (sample dataset)', hi: 'मंडी (नमूना डेटा)', mr: 'बाजार (नमुना डेटा)' },
  labelAskingPriceSuggested: { en: '₹ / quintal, suggested from ShasyaSetu', hi: '₹ / क्विंटल — शस्यसेतु की सलाह पर आधारित', mr: '₹ / क्विंटल — शस्यसेतूच्या सल्ल्यावर आधारित' },
  labelAskingPrice: { en: 'Your asking price (₹ / quintal)', hi: 'आपका माँगा गया भाव (₹ / क्विंटल)', mr: 'तुमचा मागितलेला भाव (₹ / क्विंटल)' },
  labelUploadPhoto: { en: 'Upload crop photo (for sample quality grading)', hi: 'फसल की फ़ोटो अपलोड करें (नमूना गुणवत्ता जांच के लिए)', mr: 'पिकाचा फोटो अपलोड करा (नमुना गुणवत्ता तपासणीसाठी)' },
  createLot: { en: 'Create lot', hi: 'दर्ज करें', mr: 'नोंदवा' },
  errQuantity: { en: 'Enter a quantity greater than 0', hi: '0 से अधिक मात्रा दर्ज करें', mr: '0 पेक्षा जास्त प्रमाण टाका' },
  errPrice: { en: 'Enter a valid price', hi: 'सही भाव दर्ज करें', mr: 'योग्य भाव टाका' },

  // ---------- Make offer modal ----------
  makeOfferTitle: { en: 'Make an offer', hi: 'प्रस्ताव भेजें', mr: 'ऑफर पाठवा' },
  labelOfferPrice: { en: 'Your offer price (₹ / quintal)', hi: 'आपका प्रस्तावित भाव (₹ / क्विंटल)', mr: 'तुमचा ऑफर भाव (₹ / क्विंटल)' },
  labelOfferQty: { en: 'Quantity you want (quintals)', hi: 'आपको चाहिए (क्विंटल में)', mr: 'तुम्हाला हवे असलेले प्रमाण (क्विंटलमध्ये)' },
  sendOffer: { en: 'Send offer', hi: 'प्रस्ताव भेजें', mr: 'ऑफर पाठवा' },
  errOnlyAvailable: { en: 'Only {qty} quintals available', hi: 'सिर्फ {qty} क्विंटल उपलब्ध है', mr: 'फक्त {qty} क्विंटल उपलब्ध आहे' },
  errValidQty: { en: 'Enter a valid quantity', hi: 'सही मात्रा दर्ज करें', mr: 'योग्य प्रमाण टाका' },

  // ---------- Rate modal ----------
  rateTitle: { en: 'Rate this transaction', hi: 'इस सौदे को रेट करें', mr: 'या व्यवहाराला रेट करा' },
  rateSub: { en: 'Help build trust for future deals on MandiSetu.', hi: 'मंडीसेतु पर आगे के सौदों के लिए भरोसा बनाने में मदद करें।', mr: 'मंडीसेतूवरील पुढील व्यवहारांसाठी विश्वास निर्माण करण्यास मदत करा.' },
  errSelectStars: { en: 'Please select a star rating', hi: 'कृपया स्टार रेटिंग चुनें', mr: 'कृपया स्टार रेटिंग निवडा' },
  submitRating: { en: 'Submit rating', hi: 'रेटिंग जमा करें', mr: 'रेटिंग सबमिट करा' },

  // ---------- Dispute modal ----------
  disputeTitle: { en: 'Raise a grievance', hi: 'शिकायत दर्ज करें', mr: 'तक्रार नोंदवा' },
  disputeSub: { en: "Payment for this order will be frozen until it's resolved by a MandiSetu mediator.", hi: 'जब तक मंडीसेतु मध्यस्थ इसे सुलझाए नहीं, इस ऑर्डर का भुगतान रोका जाएगा।', mr: 'जोपर्यंत मंडीसेतू मध्यस्थ हे सोडवत नाही, तोपर्यंत या ऑर्डरचे पेमेंट थांबवले जाईल.' },
  disputeReasonLabel: { en: 'What went wrong?', hi: 'क्या समस्या हुई?', mr: 'काय समस्या झाली?' },
  disputeDetailsLabel: { en: 'Details', hi: 'विवरण', mr: 'तपशील' },
  disputeDetailsPlaceholder: { en: 'Briefly describe the issue', hi: 'समस्या को संक्षेप में बताएं', mr: 'समस्या थोडक्यात सांगा' },
  submitGrievance: { en: 'Submit grievance', hi: 'शिकायत जमा करें', mr: 'तक्रार सबमिट करा' },
  disputeReason1: { en: 'Quality mismatch on delivery', hi: 'डिलीवरी पर गुणवत्ता में अंतर', mr: 'डिलिव्हरीत गुणवत्तेत फरक' },
  disputeReason2: { en: 'Delayed pickup / transport', hi: 'उठाव / परिवहन में देरी', mr: 'उचल / वाहतुकीत उशीर' },
  disputeReason3: { en: 'Quantity shortfall', hi: 'मात्रा में कमी', mr: 'प्रमाणात तूट' },
  disputeReason4: { en: 'Payment not released on time', hi: 'समय पर भुगतान नहीं हुआ', mr: 'वेळेवर पेमेंट झाले नाही' },
  disputeReason5: { en: 'Other', hi: 'अन्य', mr: 'इतर' },

  // ---------- Toasts ----------
  toastLotCreated: { en: 'Lot created — sample grading: Grade {grade}, now live to buyers', hi: 'उपज दर्ज हुई — नमूना ग्रेड: {grade}, अब खरीदारों को दिख रही है', mr: 'माल नोंदवला — नमुना ग्रेड: {grade}, आता खरेदीदारांना दिसत आहे' },
  toastOfferAccepted: { en: 'Offer accepted — {amount} locked in simulated escrow', hi: 'प्रस्ताव स्वीकार हुआ — {amount} नकली एस्क्रो में सुरक्षित हुआ', mr: 'ऑफर स्वीकारली — {amount} नकली एस्क्रोमध्ये सुरक्षित झाली' },
  toastOfferDeclined: { en: 'Offer declined', hi: 'प्रस्ताव अस्वीकार किया गया', mr: 'ऑफर नाकारली' },
  toastOfferSent: { en: 'Offer sent to {fpo}', hi: '{fpo} को प्रस्ताव भेजा गया', mr: '{fpo} यांना ऑफर पाठवली' },
  toastOrderUpdated: { en: 'Order updated', hi: 'ऑर्डर अपडेट हुई', mr: 'ऑर्डर अपडेट झाली' },
  toastPaymentReleased: { en: '{amount} released from simulated escrow to FPO', hi: 'नकली एस्क्रो से {amount} FPO को जारी किया गया', mr: 'नकली एस्क्रोमधून {amount} FPO ला जारी केली' },
  toastRatingRecorded: { en: 'Thanks — {stars}★ rating recorded', hi: 'धन्यवाद — {stars}★ रेटिंग दर्ज हुई', mr: 'धन्यवाद — {stars}★ रेटिंग नोंदवली' },
  toastGrievanceRaised: { en: 'Grievance #{id} raised — payment frozen pending review', hi: 'शिकायत #{id} दर्ज हुई — समीक्षा तक भुगतान रोका गया', mr: 'तक्रार #{id} नोंदवली — आढावा होईपर्यंत पेमेंट थांबवले' },
};

export function translate(lang, key, vars) {
  const entry = dict[key];
  if (!entry) return key;
  let text = entry[lang] || entry.en || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k]);
    });
  }
  return text;
}

export default dict;
