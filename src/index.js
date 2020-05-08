import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import edit from "./edit";
import save from "./save";

console.log("Hello Editor");

registerBlockType("10up/apple-maps-wordpress", {
	title: __("Apple Maps", "apple-maps-wordpress"),
	category: "common",
	edit,
	save,
});
