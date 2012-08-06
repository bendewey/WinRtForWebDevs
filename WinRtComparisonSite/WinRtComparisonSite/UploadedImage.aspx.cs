using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WinRtComparisonSite
{
    public partial class UploadedImage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Clear();
            if (Session["UploadedImage"] != null)
            {
                var image = Session["UploadedImage"] as byte[];
                Response.BinaryWrite(image);
            }
            else
            {
                Response.TransmitFile(Server.MapPath("~/images/spacer.png"));
            }
            Response.End();
        }
    }
}