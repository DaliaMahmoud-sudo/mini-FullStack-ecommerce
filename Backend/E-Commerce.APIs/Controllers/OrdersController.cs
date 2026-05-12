using E_Commerce.APIs.DTOs;
using E_Commerce.APIs.Entities;
using E_Commerce.Core.Entities;
using E_Commerce.Core.Repositories;
using E_Commerce.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly IGenericRepository<Order> _orderRepo;
    private readonly IGenericRepository<Product> _productRepo;
    private readonly StoreContext _dbContext;

    public OrdersController(IGenericRepository<Order> OrderRepo, IGenericRepository<Product> ProductRepo, StoreContext dbContext)
    {
        _orderRepo = OrderRepo;
        _productRepo = ProductRepo;
        _dbContext = dbContext;
    }

    // US-03 Create Order
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequestDTO request)
    {
        if (request.Items == null || !request.Items.Any())
            return BadRequest("Order must contain at least one item.");

        var order = new Order
        {
            CustomerName = request.CustomerName,
            OrderDate = DateTime.UtcNow,
            Items = new List<OrderItem>()
        };

        decimal subtotal = 0;
        int totalItemCount = 0;

        foreach (var item in request.Items)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);

            if (product == null)
                return BadRequest($"Product with ID {item.ProductId} not found.");

            if (product.Quantity < item.Quantity)
                return BadRequest($"Not enough stock for product {product.Name}.");

            product.Quantity -= item.Quantity;

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                UnitPrice = product.Price
            };

            subtotal += product.Price * item.Quantity;
            totalItemCount += item.Quantity;

            order.Items.Add(orderItem);
        }

        // Apply Discount
        decimal discountPercentage = 0;

        if (totalItemCount >= 2 && totalItemCount <= 4)
            discountPercentage = 0.05m;
        else if (totalItemCount >= 5)
            discountPercentage = 0.10m;

        decimal discountAmount = subtotal * discountPercentage;
        decimal finalTotal = subtotal - discountAmount;

        order.Subtotal = subtotal;
        order.DiscountAmount = discountAmount;
        order.FinalTotal = finalTotal;

        _orderRepo.AddAsync(order);

        return Ok(order);
    }

    // US-05 Get Order
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _dbContext.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();

        return Ok(order);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _dbContext.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ToListAsync();

        return Ok(orders);
    }


}
