using Spire.Doc;

public class DocxToPdfConverter
{
    public byte[] ConvertDocxToPdf(byte[] docxBytes)
   {
        // Load the DOCX file from a byte array
        using var memoryStream = new MemoryStream(docxBytes);
        var document = new Document();
        document.LoadFromStream(memoryStream, FileFormat.Docx);

        // Save the document as a PDF to another memory stream
        using var outputStream = new MemoryStream();
        document.SaveToStream(outputStream, FileFormat.PDF);

        return outputStream.ToArray();
    }
}
