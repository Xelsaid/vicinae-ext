/// <reference types="@vicinae/api">

/*
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 */

type ExtensionPreferences = {
  /** Wallpaper Path - The path containing the wallpaper images */
	"wallpaperPath"?: string;

	/** Grid Rows - How many rows do you want to see in the grid? */
	"gridRows": "3" | "4" | "5" | "6";

	/** Color Generator - Which color generation tool do you use? */
	"colorGenTool"?: "none" | "matugen" | "pywal" | "wpgtk" | "schemer2" | "colorz" | "haishoku" | "wallust";

	/** Toggle Vicinae - Set to true to toggle vicinae on wallpaper selection */
	"toggleVicinaeSetting": boolean;

	/** Show Image Details - Set to true to show image dimensions and size in MB. */
	"showImageDetails": boolean;

	/** Imagemagick Post-Production - Would you like to process your selected image? */
	"postProduction": "no" | "grayscale" | "grayscaleblur" | "grayscaleheavyblur" | "lightblur" | "lightblurdarken" | "heavyblur" | "heavyblurdarken" | "negate";

	/** Left Monitor Name - The Name of the monitor that shows the left side of the image after being split */
	"leftMonitor": string;

	/** Right Monitor Name - The Name of the monitor that shows the right side of the image after being split */
	"rightMonitor": string;

	/** Post Command - Run a command or even a script after setting a new wallpaper */
	"postCommand": string;
}

declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Command: Wallpaper Grid */
	export type Wpgrid = ExtensionPreferences & {
		
	}

	/** Command: Random Wallpaper */
	export type Wprandom = ExtensionPreferences & {
		
	}
}

declare namespace Arguments {
  /** Command: Wallpaper Grid */
	export type Wpgrid = {
		
	}

	/** Command: Random Wallpaper */
	export type Wprandom = {
		
	}
}