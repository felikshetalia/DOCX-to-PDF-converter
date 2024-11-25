using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]/[action]")]
public class ConversionController : ControllerBase
{
    private readonly DocxToPdfConverter _converter;

    public ConversionController()
    {
        _converter = new DocxToPdfConverter();
    }

    [HttpPost]
    public IActionResult ConvertDocxToPdf(IFormFile file)
    {
        if (file == null || file.Length == 0 || !file.FileName.EndsWith(".docx"))
            return BadRequest("Invalid DOCX file.");

        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);

        var pdfBytes = _converter.ConvertDocxToPdf(memoryStream.ToArray());

        return File(pdfBytes, "application/pdf", Path.GetFileNameWithoutExtension(file.FileName) + ".pdf");
    }
}
