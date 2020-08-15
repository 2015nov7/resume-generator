jsPDF = jspdf.jsPDF;

(function (api, $) {
	'use strict';
	api.writeText = function (text, x, y, options) {
		options = options || {};

		var defaults = {
			align: 'left',
			width: this.internal.pageSize.width - 0.5
		}

		var settings = $.extend({}, defaults, options);

		// Get current font size
		var fontSize = this.internal.getFontSize();

		// Get the actual text's width
		/* You multiply the unit width of your string by your font size and divide
		 * by the internal scale factor. The division is necessary
		 * for the case where you use units other than 'pt' in the constructor
		 * of jsPDF.
		*/
		var txtWidth = this.getStringUnitWidth(text) * fontSize / this.internal.scaleFactor;

		if (settings.align === 'center')
			x += (settings.width - txtWidth) / 2;
		else if (settings.align === 'right')
			x += (settings.width - txtWidth);

		//default is 'left' alignment
		this.text(text, x, y);

	}

})(jsPDF.API, jQuery);

var info = json_str;

const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11]
});

/* Drawing the header rectangle */
doc.setFillColor("#201F33");
doc.setDrawColor("#201F33");
doc.rect(0, 0, 8.5, 2.3199, 'FD');

/* Filling in header information */
var x = 0.5;
var y = 0.5;
/* Name */
var resume_full_name = info.details.first_name + " " + info.details.last_name
doc.setTextColor("#FFFFFF");
doc.setFont('Montserrat', 'bold');
doc.setFontSize(20);
doc.writeText(resume_full_name, x, y);
y += 0.276697; /* Adding size of font to margin. */
y += 0.15; /* Adding spacer */
/* Job Title */
doc.setTextColor("#D74761");
doc.setFont('Montserrat', 'regular');
doc.setFontSize(14);
doc.writeText(info.details.position, x, y);
y += 0.193688;
y += 0.15;
/* Blurb */
doc.setTextColor("#FFFFFF");
doc.setFont('Montserrat', 'regular');
doc.setFontSize(10);
doc.writeText(info.details.description, x, y);

/* Drawing the contact rectangle */
doc.setFillColor("#383659");
doc.setDrawColor("#383659");
doc.rect(0, 2.3199, 8.5, 1.21, 'FD');
var 

doc.save("resume.pdf");