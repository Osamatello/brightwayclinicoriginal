"use client";

import dynamic from "next/dynamic";

// A separate script loaded only where it is rendered (the Arabic layout). Imported statically, the build put the
// dictionary into the layout script that English pages share as well.
const ArabicDictionary = dynamic(() => import("./ArabicDictionaryProvider"));

export default ArabicDictionary;
