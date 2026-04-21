/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      sku: 'SKU-001',
      name: 'Sony PlayStation 5 Console',
      description: 'Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
      price: 499.99,
      rating: 4.9,
      reviews_count: 512,
      availability: true,
      images: JSON.stringify(['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
      brand: 'Sony',
      category: 'Electronics'
    },
    {
      sku: 'SKU-002',
      name: 'Wireless Noise Cancelling Headphones',
      description: 'Industry-leading noise cancellation. Features exceptional sound quality, up to 30-hour battery life with quick charging, and touch sensor controls.',
      price: 348.00,
      rating: 4.8,
      reviews_count: 320,
      availability: true,
      images: JSON.stringify(['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
      brand: 'Sony',
      category: 'Electronics'
    },
    {
      sku: 'SKU-003',
      name: 'Mechanical Gaming Keyboard',
      description: 'RGB mechanical gaming keyboard with tactile brown switches, customizable per-key backlighting, and durable aluminum frame.',
      price: 129.99,
      rating: 4.6,
      reviews_count: 145,
      availability: true,
      images: JSON.stringify(['https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
      brand: 'Corsair',
      category: 'Accessories'
    },
    {
      sku: 'SKU-004',
      name: 'Apple iPhone 14 Pro',
      description: 'The ultimate iPhone feature set with a Dynamic Island, 48MP Main camera, and Always-On display.',
      price: 999.00,
      rating: 4.9,
      reviews_count: 852,
      availability: true,
      images: JSON.stringify(['https://images.unsplash.com/photo-1663465373307-eacfa6d64dcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
      brand: 'Apple',
      category: 'Smartphones'
    },
    {
      sku: 'SKU-005',
      name: 'Ergonomic Office Chair',
      description: 'High-back mesh ergonomic office chair with adjustable lumbar support, 3D armrests, and dynamic movement mechanisms for all-day comfort.',
      price: 249.50,
      rating: 4.5,
      reviews_count: 89,
      availability: false,
      images: JSON.stringify(['https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
      brand: 'ErgoTech',
      category: 'Furniture'
    }
  ]);
};
