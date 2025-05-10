import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";

function AdminFeatures() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { toast } = useToast();

  const handleUpdateEmbeddings = async () => {
    try {
      setIsLoading(true);
      setStatus(null);

      const response = await axios.post('http://localhost:5000/api/chat/update-embeddings');

      if (response.data.success) {
        setStatus('success');
        toast({
          title: "Success",
          description: "Product embeddings updated successfully!",
        });
      } else {
        setStatus('error');
        toast({
          title: "Error",
          description: response.data.error || "Failed to update product embeddings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus('error');
      const errorMessage = error.response?.data?.error || error.response?.data?.details || error.message;
      toast({
        title: "Error",
        description: `Failed to update embeddings: ${errorMessage}`,
        variant: "destructive",
      });
      console.error('Embedding update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Assistant Features</h1>

      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Product Embeddings</h2>
        <p className="text-gray-600 mb-4">
          Update the product embeddings to improve the AI assistant's ability to understand and recommend products.
          This process may take a few minutes depending on the number of products.
        </p>

        <Button
          onClick={handleUpdateEmbeddings}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? "Updating..." : "Update Product Embeddings"}
        </Button>

        {status === 'success' && (
          <p className="mt-4 text-green-600">Embeddings updated successfully!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">Failed to update embeddings. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default AdminFeatures;
