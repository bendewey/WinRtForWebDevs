using System;

namespace WinRtComparisonSite
{
    public partial class Slide19 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Upload_Click(object sender, EventArgs e)
        {
            if (UploadedFile.HasFile)
            {
                Session["UploadedImage"] = UploadedFile.FileBytes;
            }
            else
            {
                Session["UploadedImage"] = null;
            }
        }
    }
}