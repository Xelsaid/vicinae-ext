import { exec, execSync } from "child_process";
import { showToast, Toast } from "@vicinae/api";
import { runConvertSplit, runPostProduction } from "./imagemagik";
import { callColorGen } from "./colorgen";

const commandExists = (commandName: string): boolean => {
  try {
    execSync(`command -v ${commandName}`, { stdio: "pipe" });
    return true;
  } catch (error) {
    return false;
  }
};

const getWallpaperTool = (): "hyprpaper" | null => {

  if (commandExists("hyprpaper")) {
    return "hyprpaper";
  }

  return null;
};



export async function omniCommand(

  path: string,

  monitor: string,

  apptoggle: boolean,

  colorApp: string,

  postProduction: string,

  postCommandString: string,

) {

  let success: boolean;



  if (monitor === "ALL") {

    success = await setWallpaper(path);

  } else if (monitor.includes("|")) {

    const splitImages = await runConvertSplit(path);

    const monitors = monitor.split("|");



    const ok1 = await setWallpaperOnMonitor(splitImages[0], monitors[0]);

    const ok2 = await setWallpaperOnMonitor(splitImages[1], monitors[1]);



    success = ok1 && ok2;

  } else {

    success = await setWallpaperOnMonitor(path, monitor);

  }



  if (success) {

    if (apptoggle) {

      toggleVicinae();

    }

    if (colorApp !== "none") {

      const colorGenSuccess = await callColorGen(path, colorApp);



      if (colorGenSuccess) {

        showToast({

          style: Toast.Style.Success,

          title: "Wall set, colors generated!",

        });

      } else {

        showToast({

          style: Toast.Style.Failure,

          title: "Color generation failed",

        });

      }

    }

    if (postProduction !== "no") {

      const postProdSuccess = await runPostProduction(path, postProduction);



      if (postProdSuccess) {

        showToast({

          style: Toast.Style.Success,

          title: "Wall set, colors generated, post proc done!",

        });

      } else {

        showToast({

          style: Toast.Style.Failure,

          title: "Post processing failed",

        });

      }

    }

    if (postCommandString) {

      const postCommandSuccess = await execPostCommand(postCommandString, path);



      if (postCommandSuccess) {

        showToast({

          style: Toast.Style.Success,

          title: "Wall set, colors generated, post proc done, command ran!",

        });

      } else {

        showToast({

          style: Toast.Style.Failure,

          title: "Post command failed",

        });

      }

    }

  } else {

    showToast({

      style: Toast.Style.Failure,

      title: "ERROR: Check your wallpaper daemon",

      message: "Make sure your wallpaper daemon is running.",

    });

  }

}



export const setWallpaper = async (path: string): Promise<boolean> => {

  try {

    const tool = getWallpaperTool();

    if (tool === "hyprpaper") {
      execSync(`hyprctl hyprpaper wallpaper ",${path}"`, { stdio: "pipe" });

      return true;
    }

    execSync(`${tool} query`, { stdio: "pipe" });



    return await new Promise<boolean>((resolve) => {

      exec(`${tool} img "${path}"`, (error) => {

        if (error) {

          resolve(false);

        }

        else {

          resolve(true);

        }

      });

    });

  } catch (error) {

    return false;

  }

};



export const setWallpaperOnMonitor = async (path: string, monitorName: string): Promise<boolean> => {

  try {

    const tool = getWallpaperTool();

    if (tool === "hyprpaper") {
      execSync(`hyprctl hyprpaper wallpaper "${monitorName},${path}"`, { stdio: "pipe" });
      return true;
    }

    execSync(`${tool} query`, { stdio: "pipe" });



    return await new Promise<boolean>((resolve) => {

      exec(`${tool} img "${path}" --outputs "${monitorName}"`, (error) => {

        if (error) {

          resolve(false);

        }

        else {

          resolve(true);

        }

      });

    });

  } catch (error) {

    return false;

  }

};

export const toggleVicinae = (): void => {
  exec(`vicinae vicinae://toggle`);
};

export const execPostCommand = async (postCommand: string, imagePath: string): Promise<boolean> => {
  console.log(postCommand);
  console.log(imagePath);
  return await new Promise<boolean>((resolve) => {
    const command = postCommand.replace(/\$\{wallpaper\}/g, imagePath);

    exec(command, (error) => {
      if (error) {
        console.error(`Post command failed: ${error.message}`);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
