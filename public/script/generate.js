function getTodayPart(part, leading=true){
    var today = new Date();
    switch (part) {
        case "year":
            return today.getFullYear();
        case "month":
            if (leading){
                if ((today.getMonth() + 1) < 10) {
                    return "0" + (today.getMonth() + 1);
                }
                return (today.getMonth() + 1);
            }
            return (today.getMonth() + 1);
        case "day":
            if (leading){
                if (today.getDate() < 10) {
                    return "0" + today.getDate();
                }
                return today.getDate();
            }
            return today.getDate();
        default:
            return "0";
    }
}

var info = json_str;

/* Setting the title of the page. */
var resume_date = getTodayPart("year") + "-" + getTodayPart("month") + "-" + getTodayPart("day");
var resume_start = info.details.last_name + "," + info.details.first_name + "_Resume";
var resume_title = resume_start + "_" + resume_date;
document.getElementsByTagName("title")[0].innerHTML = resume_title;

/* Setting the header information. */
var resume_full_name = info.details.first_name + " " + info.details.last_name;
document.getElementById("resume-header-name").innerHTML = resume_full_name;
document.getElementById("resume-header-position").innerHTML = info.details.position;
document.getElementById("resume-header-desc").innerHTML = info.details.description;

/* Setting the contact information. */
var current_icon = ""
var span_contact_start = '<span class="icon ic-'
var span_contact_end = '"></span><span class="txt-contact">'
var es = "</span>";
var contact_content = span_contact_start + current_icon + span_contact_end;
if (info.details.email && info.details.email !== "") {
    current_icon = "email";
    contact_content = span_contact_start + current_icon + span_contact_end + " ";
    document.getElementById("contact-email").innerHTML = contact_content + info.details.email + es;
} else {
    document.getElementById("contact-email").innerHTML = "";
}
if (info.details.website && info.details.website !== "") {
    current_icon = "web";
    contact_content = span_contact_start + current_icon + span_contact_end + " ";
    document.getElementById("contact-web").innerHTML = contact_content + info.details.website + es;
} else {
    document.getElementById("contact-web").innerHTML = "";
}
if (info.details.location && info.details.location !== "") {
    current_icon = "loc";
    contact_content = span_contact_start + current_icon + span_contact_end + " ";
    document.getElementById("contact-loc").innerHTML = contact_content + info.details.location + es;
} else {
    document.getElementById("contact-loc").innerHTML = "";
}
if (info.details.phone && info.details.phone !== "") {
    current_icon = "phone";
    contact_content = span_contact_start + current_icon + span_contact_end + " ";
    document.getElementById("contact-phone").innerHTML = contact_content + info.details.phone + es;
} else {
    document.getElementById("contact-phone").innerHTML = "";
}
if (info.details.linkedin && info.details.linkedin !== "") {
    current_icon = "linkedin";
    contact_content = span_contact_start + current_icon + span_contact_end + " ";
    contact_content += "https://www.linkedin.com/in/"
    document.getElementById("contact-li").innerHTML = contact_content + info.details.linkedin + es;
} else {
    document.getElementById("contact-li").innerHTML = "";
}
if (info.details.github && info.details.github !== "") {
    current_icon = "github";
    contact_content = span_contact_start + current_icon + span_contact_end + " ";
    contact_content += "https://www.github.com/"
    document.getElementById("contact-gh").innerHTML = contact_content + info.details.github + es;
} else {
    document.getElementById("contact-gh").innerHTML = "";
}

/* Filling in the Skills section */
var section_header = "SKILLS & COMPETENCIES";
if (info.skills.header) section_header = info.skills.header;
var header_html = '<p class="section-header">' + section_header + '</p>\n';
var section_details = "";
for (var i = 0; i < info.skills.skills.length; i++){
    section_details += '<p class="skill-header">' + info.skills.skills[i].title + '</p>';
    section_details += "\n";
    section_details += '<p class="skill-details">' + info.skills.skills[i].details + '</p>';
    section_details += "\n";
}
document.getElementById("resume-section-skills").innerHTML = header_html + section_details;

/* Filling in the Experience section. */
section_header = "PROFESSIONAL EXPERIENCE";
if (info.experience.header) section_header = info.experience.header;
header_html = '<p class="section-header">' + section_header + '</p>\n';
section_details = "";
for (var i = 0; i < info.experience.jobs.length; i++){
    section_details += '<p class="job-title">' + info.experience.jobs[i].title + '</p>';
    section_details += "\n";
    section_details += '<p class="job-location">' + info.experience.jobs[i].company;
    section_details += ' <span class="sepd">•</span> ' + info.experience.jobs[i].location + '</p>';
    section_details += "\n";
    section_details += '<p class="job-date">' + info.experience.jobs[i].start;
    section_details += ' – ' + info.experience.jobs[i].end + '</p>';
    section_details += "\n";
    section_details += '<p class="job-desc">';
    for (var k = 0; k < info.experience.jobs[i].description.length; k++) {
        section_details += '<span class="bullet">•</span> ';
        section_details += info.experience.jobs[i].description[k];
        section_details += '\n</br>\n';
    }
    section_details += '</p>'
    section_details += "\n";
}
document.getElementById("resume-section-experience").innerHTML = header_html + section_details;

/* Filling in the Education section. */
section_header = "EDUCATION";
if (info.education.header) section_header = info.education.header;
header_html = '<p class="section-header">' + section_header + '</p>\n';
section_details = "";

for (var i = 0; i < info.education.entries.length; i++){
    section_details += '<p class="education-subject">' + info.education.entries[i].certificate;
    section_details += ' in ' + info.education.entries[i].field + '</p>';
    section_details += "\n";
    section_details += '<p class="education-location">' + info.education.entries[i].institution;
    section_details += '<span class="sepd"> • </span>' + info.education.entries[i].location;
    section_details += '</p>\n';
    section_details += '<p class="education-date">' + info.education.entries[i].start;
    section_details += ' – ' + info.education.entries[i].end + '</p>';
    section_details += '\n';
}
document.getElementById("resume-section-education").innerHTML = header_html + section_details;

var html_str = '<html lang="en">\n' + document.getElementsByTagName("html")[0].innerHTML
html_str += "\n</html>"
var html_blob = new Blob([html_blob], {type: 'text/html'});
var blob_link = URL.createObjectURL(html_blob);

document.getElementById("download_button").innerHTML = '<a href="' + blob_link + '" download="resume.pdf">Download</a>';