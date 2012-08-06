<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Slide19.aspx.cs" Inherits="WinRtComparisonSite.Slide19" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Uploading Content in Browser</title>
    <link href="default.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="bulleted-content">
        <asp:FileUpload runat="server" ID="UploadedFile" style="width:500px;"  />
        <asp:Button runat="server" ID="Upload" Text="Upload" OnClick="Upload_Click" />
        <br />
        <img src="UploadedImage.aspx" style="width:800px; height:600px;" />
    </div>
    <img src="images/Slide19.png" alt="" style="width:100%; height:100%;" />
    </form>
</body>
</html>
