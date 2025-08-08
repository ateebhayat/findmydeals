-- Insert sample brands
INSERT INTO brands (brand_name, email, password_hash, contact_person, phone, website, description, category, address, city, state, zip_code, is_verified) VALUES
('Fashion Forward', 'contact@fashionforward.com', '$2b$10$example_hash_1', 'Sarah Johnson', '+1-555-0101', 'https://fashionforward.com', 'Trendy clothing for the modern lifestyle', 'clothing', '123 Fashion Ave', 'New York', 'NY', '10001', TRUE),
('Brew Masters', 'hello@brewmasters.com', '$2b$10$example_hash_2', 'Mike Chen', '+1-555-0102', 'https://brewmasters.com', 'Artisanal coffee roasted to perfection', 'food', '456 Coffee St', 'San Francisco', 'CA', '94102', TRUE),
('Tech Gadgets Pro', 'support@techgadgetspro.com', '$2b$10$example_hash_3', 'Alex Rodriguez', '+1-555-0103', 'https://techgadgetspro.com', 'Latest technology and gadgets', 'electronics', '789 Tech Blvd', 'Austin', 'TX', '73301', TRUE),
('Serenity Spa', 'info@serenityspa.com', '$2b$10$example_hash_4', 'Emma Wilson', '+1-555-0104', 'https://serenityspa.com', 'Relaxation and wellness services', 'beauty', '321 Wellness Way', 'Los Angeles', 'CA', '90210', TRUE);

-- Insert sample offers
INSERT INTO offers (brand_id, title, description, discount_type, discount_value, category, valid_from, valid_until, is_active, terms, location, max_redemptions, promo_code, views, clicks) VALUES
(1, '50% Off Summer Collection', 'Get 50% off on all summer clothing items. Limited time offer!', 'percentage', '50', 'clothing', '2024-07-01', '2024-08-31', TRUE, 'Cannot be combined with other offers. Valid on regular priced items only.', 'New York, NY', 1000, 'SUMMER50', 1250, 89),
(2, 'Buy 2 Get 1 Free Coffee', 'Purchase any two coffee drinks and get the third one absolutely free.', 'bogo', '33', 'food', '2024-07-15', '2024-07-31', TRUE, 'Valid on coffee drinks only. Third item must be of equal or lesser value.', 'San Francisco, CA', 500, 'COFFEE3', 890, 45),
(3, 'Free Shipping on Orders Over $75', 'Enjoy free shipping on all orders above $75. No code needed!', 'free-shipping', 'Free Shipping', 'electronics', '2024-07-01', '2024-09-30', TRUE, 'Valid on orders over $75. Excludes expedited shipping.', 'Online', NULL, NULL, 567, 23),
(4, '20% Off First Visit', 'New customers get 20% off their first spa treatment session.', 'percentage', '20', 'beauty', '2024-07-01', '2024-12-31', TRUE, 'Valid for new customers only. Cannot be combined with other promotions.', 'Los Angeles, CA', 200, 'FIRST20', 432, 31),
(1, 'Winter Clearance Sale', 'Up to 70% off winter clothing items', 'percentage', '70', 'clothing', '2024-06-01', '2024-07-15', FALSE, 'Final sale items. No returns or exchanges.', 'New York, NY', 800, 'WINTER70', 2100, 156);

-- Update the updated_at timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
