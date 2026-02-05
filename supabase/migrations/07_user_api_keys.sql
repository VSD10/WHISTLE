-- =====================================================
-- WHISTLE Database Schema - User API Keys
-- =====================================================
-- Migration: 07_user_api_keys.sql
-- Description: Add support for user custom models and encrypted API keys
-- =====================================================

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create user_api_keys table
CREATE TABLE IF NOT EXISTS user_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('openai', 'anthropic', 'google', 'meta', 'custom')),
    model_name VARCHAR(100) NOT NULL,
    api_key_encrypted TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider, model_name)
);

-- Add index for faster lookups
CREATE INDEX idx_user_api_keys_user_id ON user_api_keys(user_id);
CREATE INDEX idx_user_api_keys_active ON user_api_keys(user_id, is_active);

-- Update user_settings to add preferred_model column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_settings' 
        AND column_name = 'preferred_model'
    ) THEN
        ALTER TABLE user_settings 
        ADD COLUMN preferred_model VARCHAR(100) DEFAULT 'gpt-4';
    END IF;
END $$;

-- Function to encrypt API key
CREATE OR REPLACE FUNCTION encrypt_api_key(api_key TEXT, encryption_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(
        pgp_sym_encrypt(api_key, encryption_key),
        'base64'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt API key (server-side only)
CREATE OR REPLACE FUNCTION decrypt_api_key(encrypted_key TEXT, encryption_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(
        decode(encrypted_key, 'base64'),
        encryption_key
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_api_keys_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_api_keys_updated_at
    BEFORE UPDATE ON user_api_keys
    FOR EACH ROW
    EXECUTE FUNCTION update_user_api_keys_updated_at();

-- Enable Row Level Security
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view their own API keys
CREATE POLICY user_api_keys_select_policy ON user_api_keys
    FOR SELECT
    USING (auth.uid() = user_id);

-- RLS Policy: Users can only insert their own API keys
CREATE POLICY user_api_keys_insert_policy ON user_api_keys
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can only update their own API keys
CREATE POLICY user_api_keys_update_policy ON user_api_keys
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can only delete their own API keys
CREATE POLICY user_api_keys_delete_policy ON user_api_keys
    FOR DELETE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON user_api_keys TO authenticated;
GRANT EXECUTE ON FUNCTION encrypt_api_key TO authenticated;
-- Note: decrypt_api_key should only be called server-side, not exposed to client

COMMENT ON TABLE user_api_keys IS 'Stores encrypted API keys for user custom AI models';
COMMENT ON COLUMN user_api_keys.api_key_encrypted IS 'Encrypted API key using pgcrypto';
COMMENT ON FUNCTION encrypt_api_key IS 'Encrypts API key before storage';
COMMENT ON FUNCTION decrypt_api_key IS 'Decrypts API key (server-side only)';
