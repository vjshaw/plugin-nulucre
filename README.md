# @elizaos/plugin-nulucre

The credit score for crypto wallets. ElizaOS plugin for Nulucre Agents — wallet reputation scoring across 81+ chains and DeFi TVL fact verification via x402 micropayments on Base mainnet.

## Features

- **CHECK_WALLET_REPUTATION** — Returns a 0-100 trust score for any EVM wallet across 81+ chains
- **VERIFY_DEFI_CLAIM** — Verifies DeFi protocol TVL claims against DeFi Llama on-chain data

## Pricing

- Wallet Reputation Score: $0.003 USDC per query
- Signed Wallet Score: $0.01 USDC per query  
- DeFi TVL Verification: $0.01 USDC per report

## Data Sources

- Etherscan V2 — Wallet age and transaction volume
- Moralis / DeBank — DeFi protocol activity
- Alchemy — Polygon, Arbitrum, Optimism activity
- Ankr — 81+ chain asset coverage

## Installation
```bash
elizaos plugins add github:vjshaw/plugin-nulucre
```

## Usage

Once installed your ElizaOS agent will automatically:
- Check wallet reputation when a wallet address is mentioned
- Verify DeFi TVL claims when protocol TVL is discussed

## Example
```
User: What is the reputation score of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?
Agent: Wallet Reputation Score: 97/100 — TRUSTED
       Wallet Age: 3827 days (30/30)
       TX Volume: 10000 txs (40/40)
       DeFi Activity: 4 protocols (8/20)
       Multi-Chain: 3 EVM chains (9/10)
       Ankr Coverage: 16 chains with assets (10/10)
```

## Discovery

- Website: https://nulucre.com
- x402.json: https://nulucre.com/.well-known/x402.json
- JWKS: https://nulucre.com/.well-known/jwks.json

## Payment

All payments are processed via x402 protocol in USDC on Base mainnet.
No API keys required — pure agent-to-agent commerce.

## License

MIT
