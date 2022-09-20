var showColorPicker = true;
let product_name;

let str = window.location.href;

var n = str.lastIndexOf("/");

var n1 = str.lastIndexOf("?");

if (n1 > 0) {
  product_name = str.slice(n + 1, n1);
} else {
  product_name = str.slice(n + 1);
}

jQuery.getJSON(
  "/products/" + product_name + ".json",

  function (product) {
    product_id = product.product.id;

    console.log(product_id);

    $.ajax({
      url:
        "http://custompillow.codinginfotech.com/check.php?pr_id=" + product_id,

      type: "POST",

      success: function (response) {
        //alert(response);

        let data = JSON.parse(response);

        if (data.bg_color == "false") {
          showColorPicker = false;
        }

        // console.log();
      },

      error: function (xhr, textStatus, error) {
        return false;
      },
    });

    // console.log(product_id);
  }
);

var colorpickerColor = false;
var colorpicker2Color = false;

const pickr = Pickr.create({
  el: "#colorpicker",
  theme: "nano", // or 'monolith', or 'nano'
  default: null,

  components: {
    // Main components
    preview: true,
    palette: true,
    hue: true,

    // Input / output Options
    interaction: {
      input: true,
      cancel: true,
      clear: true,
      save: true,
    },
  },
});

pickr
  .on("init", (instance) => {
    console.log('Event: "init"', instance);
  })
  .on("hide", (instance) => {
    console.log('Event: "hide"', instance);
  })
  .on("show", (color, instance) => {
    console.log('Event: "show"', color, instance);
  })
  .on("save", (color, instance) => {
    pickr.hide();
    console.log('Event: "save"', color, instance);
  })
  .on("clear", (instance) => {
    pickr.hide();
    colorpickerColor = false;
    document.querySelector(".cropper-wrap-box").style.background = null;
  })
  .on("change", (color, source, instance) => {
    color = color.toRGBA();
    if (color) {
      colorpickerColor = color;
      document.querySelector(".cropper-wrap-box").style.background = color;
    } else {
      colorpickerColor = false;
      document.querySelector(".cropper-wrap-box").style.background = null;
    }

    console.log('Event: "change"', color, source, instance);
  })
  .on("changestop", (source, instance) => {
    console.log('Event: "changestop"', source, instance);
  })
  .on("cancel", (instance) => {
    pickr.hide();
    console.log('Event: "cancel"', instance);
  })
  .on("swatchselect", (color, instance) => {
    console.log('Event: "swatchselect"', color, instance);
  });

const pickr2 = Pickr.create({
  el: "#colorpicker2",
  theme: "nano", // or 'monolith', or 'nano'
  default: null,
  components: {
    // Main components
    preview: true,
    palette: true,
    hue: true,

    // Input / output Options
    interaction: {
      cancel: true,
      clear: true,
      save: true,
    },
  },
});

pickr2
  .on("init", (instance) => {
    console.log('Event: "init"', instance);
  })
  .on("hide", (instance) => {
    console.log('Event: "hide"', instance);
  })
  .on("show", (color, instance) => {
    console.log('Event: "show"', color, instance);
  })
  .on("save", (color, instance) => {
    pickr2.hide();
    console.log('Event: "save"', color, instance);
  })
  .on("clear", (instance) => {
    pickr2.hide();
    colorpicker2Color = false;
    document
      .querySelector("#canvasSizer[data-set='2']")
      .querySelector(".cropper-wrap-box").style.background = null;
  })
  .on("change", (color, source, instance) => {
    color = color.toRGBA();
    if (color) {
      colorpicker2Color = color;

      document
        .querySelector("#canvasSizer[data-set='2']")
        .querySelector(".cropper-wrap-box").style.background = color;
    } else {
      colorpicker2Color = false;
      document
        .querySelector("#canvasSizer[data-set='2']")
        .querySelector(".cropper-wrap-box").style.background = null;
    }

    console.log('Event: "change"', color, source, instance);
  })
  .on("changestop", (source, instance) => {
    console.log('Event: "changestop"', source, instance);
  })
  .on("cancel", (instance) => {
    pickr.hide();
    console.log('Event: "cancel"', instance);
  })
  .on("swatchselect", (color, instance) => {
    console.log('Event: "swatchselect"', color, instance);
  });

function blobToDataurl(cropper, color) {
  var canvas = document.getElementById("viewport"),
    context = canvas.getContext("2d");
  canvas.width = cropper.getCroppedCanvas().width;
  canvas.height = cropper.getCroppedCanvas().height;

  fetch(
    "https://images.pexels.com/photos/13623557/pexels-photo-13623557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  )
    .then(function (response) {
      return response.blob();
    })
    .then(function (myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      var k = new Image();
      k.src = objectURL;
      context.drawImage(k, 100, 100);

      let d = null;
      console.log(color);
      if (color) {
        d = cropper
          .getCroppedCanvas({
            fillColor: color,
          })
          .toDataURL("image/jpeg");
      } else {
        d = cropper.getCroppedCanvas().toDataURL("image/png");

        base_image = new Image();
        base_image.src = d;
        context.drawImage(base_image, 100, 100);
      }
      return d;
    });
}

if ($(window).width() < 768) {
  document.getElementById("image-resiser").style.margin = "auto";
  document.getElementById("image-resiser").style.height = "250px";
  document.getElementById("image-resiser").style.width = "250px";
} else if ($(window).width() >= 768 && $(window).width() <= 992) {
  document.getElementById("image-resiser").style.margin = "auto";
  document.getElementById("image-resiser").style.height = "250px";
  document.getElementById("image-resiser").style.width = "250px";
  // do something for medium screens
}
var imageObject = {
  originalImage1: null,
  originalImage2: null,
  removeBackground1: null,
  removeBackground2: null,
};
const image = document
  .querySelector(".image-resizer-conatiner[data-set='1']")
  .querySelector("img");

let cropper = new Cropper(image, {
  rotatable: true,
  viewMode: 3,
  aspectRatio: 1,
  dragMode: "move",
  minContainerWidth: 10,
  minContainerHeight: 10,
  // minCropBoxWidth: 200,
  // minCropBoxHeight: 200,
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
});

document.querySelector(".js-rotate").addEventListener("click", () => {
  cropper.rotate(90);
});
document.querySelector(".js-rotatem").addEventListener("click", () => {
  cropper.rotate(-90);
});

document.querySelector(".js-live-zoom-in").addEventListener("click", () => {
  cropper.zoom(0.1);
});
document.querySelector(".js-live-zoom-out").addEventListener("click", () => {
  cropper.zoom(-0.1);
});

document
  .querySelector(".js-rotate[data-side='2']")
  .addEventListener("click", () => {
    cropper2.rotate(90);
  });
document
  .querySelector(".js-rotatem[data-side='2']")
  .addEventListener("click", () => {
    cropper2.rotate(-90);
  });

document
  .querySelector(".js-live-zoom-in[data-side='2']")
  .addEventListener("click", () => {
    cropper2.zoom(0.1);
  });
document
  .querySelector(".js-live-zoom-out[data-side='2']")
  .addEventListener("click", () => {
    cropper2.zoom(-0.1);
  });

function dataURLtoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {
    type: "image/png",
  });
}

function previewFile(e) {
  var file = e.files[0];
  imageObject.originalImage1 = e.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    console.log("testing reader", reader.result);
    cropper.replace(reader.result);
    dataURLimg[1] = dataURLtoBlob(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
  document
    .querySelector(".js-edit-step[data-side='1']")
    .classList.remove("disabled");
}

const image2 = document
  .querySelector(".image-resizer-conatiner[data-set='2']")
  .querySelector("img");

let cropper2 = new Cropper(image2, {
  rotatable: true,
  viewMode: 3,
  aspectRatio: 1,
  dragMode: "move",

  minCropBoxWidth: 200,
  minCropBoxHeight: 200,
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
});

document.querySelector(".js-rotate").addEventListener("click", () => {
  cropper2.rotate(90);
});
document.querySelector(".js-rotatem").addEventListener("click", () => {
  cropper2.rotate(-90);
});

document.querySelector(".js-live-zoom-in").addEventListener("click", () => {
  cropper2.zoom(0.1);
});
document.querySelector(".js-live-zoom-out").addEventListener("click", () => {
  cropper2.zoom(-0.1);
});

document
  .querySelector("#removeCrop[data-side='1']")
  .addEventListener("click", (e) => {
    if (e.target.checked) {
      cropper.clear();
      // document.getElementById("crop-actions1").classList.add("hide")
    } else {
      cropper.crop();
      // document.getElementById("crop-actions1").classList.remove("hide")
    }
  });

document
  .querySelector("#removeCrop[data-side='2']")
  .addEventListener("click", (e) => {
    if (e.target.checked) {
      cropper2.clear();
      // document.getElementById("crop-actions2").classList.add("hide")
    } else {
      cropper2.crop();
      // document.getElementById("crop-actions2").classList.remove("hide")
    }
  });

function previewFile2(e) {
  var file = e.files[0];
  var reader = new FileReader();
  imageObject.originalImage2 = e.files[0];
  reader.onloadend = function () {
    cropper2.replace(reader.result);
    dataURLimg[2] = dataURLtoBlob(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
  document
    .querySelector(".js-edit-step[data-side='2']")
    .classList.remove("disabled");
}

document
  .querySelector(".js-save_pillow[data-side='1']")
  .addEventListener("click", () => {
    if (varient1Selected) {
      document.querySelector(".custm-modal").classList.add("confirm");

      document
        .querySelector(".couch-pr__block[data-side='1']")
        .querySelector(".couch-pr__item")
        .querySelector("img").src = blobToDataurl(cropper, colorpickerColor);
    }
    if (varient2Selected) {
      document
        .querySelector(".image-resizer-conatiner[data-set='1']")
        .classList.add("hide");
      document
        .querySelector(".image-resizer-conatiner[data-set='2']")
        .classList.remove("hide");
      document.querySelector(".cusm-b-step__wrap").classList.add("js-open-s2");
    }
  });

document.getElementById("edit_pillow").addEventListener("click", () => {
  document.querySelector(".custm-modal").classList.remove("confirm");
});

document.querySelector(".edit-step__back").addEventListener("click", () => {
  if (varient2Selected) {
    document
      .querySelector(".image-resizer-conatiner[data-set='1']")
      .classList.remove("hide");
    document
      .querySelector(".image-resizer-conatiner[data-set='2']")
      .classList.add("hide");
    // document.querySelector(".js-edit-step[data-side='1']").classList.remove("hide")
    // document.querySelector(".js-edit-step[data-side='2']").classList.add("hide")
    document.querySelector(".cusm-b-step__wrap").classList.remove("js-open-s2");
  }
});

document
  .querySelector(".js-save_pillow[data-side='2']")
  .addEventListener("click", () => {
    document.querySelector(".custm-modal").classList.add("confirm");

    document
      .querySelector(".couch-pr__block[data-side='2']")
      .querySelector(".couch-pr__item")
      .querySelector("img").src = blobToDataurl(cropper2, colorpicker2Color);

    document
      .querySelector(".couch-pr__block[data-side='1']")
      .querySelector(".couch-pr__item")
      .querySelector("img").src = blobToDataurl(cropper, colorpickerColor);
  });

function createMockup(src_img, side_num) {
  let canvas_p = null;

  if (side_num === 2) {
    canvas_p = new fabric.Canvas("mockup-b", {
      enableRetinaScaling: false,
    });
  } else {
    canvas_p = new fabric.Canvas("mockup-p", {
      enableRetinaScaling: false,
    });
  }

  // document.getElementById("mockup-p").parentElement.style.display = "none";

  fabric.Image.fromURL(
    src_img,
    function (myImg) {
      let img1 = myImg.set({
        left: 19,
        top: 23,
      });
      img1.scaleToHeight(396);
      canvas_p.add(img1);

      fabric.Image.fromURL(
        "//cdn.shopify.com/s/files/1/1501/4378/t/48/assets/pp1.png?v=162410002496692271721639134057",
        function (myImg) {
          let img2 = myImg.set({
            left: 19,
            top: 43,
            globalCompositeOperation: "destination-atop",
          });
          canvas_p.add(img2);

          fabric.Image.fromURL(
            "//cdn.shopify.com/s/files/1/1501/4378/t/48/assets/p-sh3.png?v=123621016080460407031639134056",
            function (myImg) {
              let img4 = myImg.set({
                left: 19,
                top: 43,
                globalCompositeOperation: "darken",
              });
              canvas_p.add(img4);

              //               fabric.Image.fromURL(
              //                 "//cdn.shopify.com/s/files/1/1501/4378/t/48/assets/p-bg.png?v=170876419248511200441639134054",
              //                 function(myImg) {
              //                   let img3 = myImg.set({
              //                     left: 0,
              //                     top: 0,
              //                     globalCompositeOperation: "destination-over",
              //                   });
              //                   canvas_p.add(img3);
              //                   canvas_p.renderAll();

              //                   sides_image[side_num]["mockup"] = canvas_p.toDataURL({
              //                     top: 21,
              //                     left: 0,
              //                     width: 434,
              //                     height: 413,
              //                     format: "png",
              //                     quality: 1,
              //                   });
              //                   canvas_p.clear();
              //                 }, {
              //                   crossOrigin: "Anonymous"
              //                 }
              //               );
            },
            {
              crossOrigin: "Anonymous",
            }
          );
        },
        {
          crossOrigin: "Anonymous",
        }
      );
    },
    {
      crossOrigin: "Anonymous",
    }
  );
  document.getElementById("mockup-p").style.display = "none";
}
document.querySelector("#confirm_pillow").addEventListener("click", () => {
  if (colorpickerColor) {
    cropper
      .getCroppedCanvas({
        fillColor: colorpickerColor,
      })
      .toBlob((blob) => {
        dataURLmockup[1] = blob;
      }, "image/jpeg");

    if (varient2Selected) {
      cropper2
        .getCroppedCanvas({
          fillColor: colorpicker2Color,
        })
        .toBlob((blob) => {
          dataURLmockup[2] = blob;
        }, "image/jpeg");
    }
  } else {
    cropper.getCroppedCanvas().toBlob((blob) => {
      dataURLmockup[1] = blob;
    }, "image/png");

    if (varient2Selected) {
      cropper2.getCroppedCanvas().toBlob((blob) => {
        dataURLmockup[2] = blob;
      }, "image/png");
    }
  }

  modalOpenCustm(".custm-modal__wrap");
  document
    .querySelector(".custm-preview__item[data-side='1']")
    .querySelector(".custm-preview__img").src = blobToDataurl(
    cropper,
    colorpickerColor
  );

  if (varient2Selected) {
    document
      .querySelector(".custm-preview__item[data-side='2']")
      .querySelector(".custm-preview__img").src = blobToDataurl(
      cropper2,
      colorpicker2Color
    );
  }
  document.querySelector(".custm-preview").classList.remove("hide");
  var count16 = 1656 / cropper.getCroppedCanvas();

  var ml = blobToDataurl(cropper, colorpickerColor);
  var canv = createMockup(ml, 1);
  if (varient2Selected) {
    var ml = blobToDataurl(cropper2, colorpicker2Color);
    var canv = createMockup(ml, 2);
  }
});

document
  .querySelector("#removeBackground[data-side='1']")
  .addEventListener("change", (e) => {
    if (e.target.checked) {
      if (showColorPicker) {
        document.querySelector("#colorpickerbox-1").classList.remove("hide");
      }

      document
        .querySelector(".js-edit-step[data-side='1']")
        .classList.add("disabled");
      document.querySelector(".cusm-b__preloader").classList.remove("hide");
      document.querySelector("#canvasSizer[data-set='1']").style.opacity =
        "0.5";
      // code here
      var myHeaders = new Headers();
      myHeaders.append("APIKEY", "203fcdcdb7f042c3a09a42e69abab3ee");
      myHeaders.append("Cookie", "ClientFlag=3566615f75354e65bc7b46c909c31b45");

      var form = new FormData(document.getElementById("backgroundremoveform1"));
      form.append(
        "file",
        imageObject.originalImage1,
        imageObject.originalImage1.name
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: form,
        redirect: "follow",
      };

      fetch(
        "https://www.cutout.pro/api/v1/matting?mattingType=6",
        requestOptions
      )
        .then((response) => response.blob())
        .then((data) => {
          var reader = new FileReader();
          reader.onload = function () {
            var b64 = reader.result;
            cropper.replace(b64);
            imageObject.removeBackground1 = b64;
          };
          reader.readAsDataURL(data);
          document
            .querySelector(".js-edit-step[data-side='1']")
            .classList.remove("disabled");
          document.querySelector(".cusm-b__preloader").classList.add("hide");
          document.querySelector("#canvasSizer[data-set='1']").style.opacity =
            "1";
        })
        .catch((error) => console.log("error", error));
    } else {
      if (showColorPicker) {
        document.querySelector("#colorpickerbox-1").classList.add("hide");
      }

      var reader = new FileReader();
      var file = imageObject.originalImage1;
      var reader = new FileReader();

      reader.onloadend = function () {
        cropper.replace(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  });

document
  .querySelector("#removeBackground[data-side='2']")
  .addEventListener("change", (e) => {
    if (e.target.checked) {
      if (showColorPicker) {
        document.querySelector("#colorpickerbox-2").classList.remove("hide");
      }

      document
        .querySelector(".js-edit-step[data-side='2']")
        .classList.add("disabled");
      document.querySelector(".cusm-b__preloader").classList.remove("hide");

      // code here
      var myHeaders = new Headers();
      myHeaders.append("APIKEY", "203fcdcdb7f042c3a09a42e69abab3ee");
      myHeaders.append("Cookie", "ClientFlag=3566615f75354e65bc7b46c909c31b45");

      var form = new FormData(document.getElementById("backgroundremoveform2"));
      form.append(
        "file",
        imageObject.originalImage2,
        imageObject.originalImage2.name
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: form,
        redirect: "follow",
      };

      fetch(
        "https://www.cutout.pro/api/v1/matting?mattingType=6",
        requestOptions
      )
        .then((response) => response.blob())
        .then((data) => {
          var reader = new FileReader();
          reader.onload = function () {
            var b64 = reader.result;
            cropper2.replace(b64);
            imageObject.removeBackground2 = b64;
          };
          reader.readAsDataURL(data);
          document
            .querySelector(".js-edit-step[data-side='2']")
            .classList.remove("disabled");
          document.querySelector(".cusm-b__preloader").classList.add("hide");
        })
        .catch((error) => console.log("error", error));
    } else {
      if (showColorPicker) {
        document.querySelector("#colorpickerbox-2").classList.add("hide");
      }

      var reader = new FileReader();
      var file = imageObject.originalImage2;
      var reader = new FileReader();

      reader.onloadend = function () {
        cropper2.replace(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  });
