namespace E_Commerce.APIs.DTOs
{
    public class CreateOrderRequestDTO
    {
        public string CustomerName { get; set; }
        public List<OrderItemRequest> Items { get; set; }
    }

    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

}
