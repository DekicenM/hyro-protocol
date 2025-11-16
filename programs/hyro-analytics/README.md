# Hyro Analytics Solana Program

This is the Solana program (smart contract) for HyroX Analytics, built with Anchor framework.

## Features

- **Trader Badge NFT**: On-chain representation of trader identity and stats
- **Stat Updates**: Update trading statistics on-chain
- **Account Tiering**: Track account tier progression

## Development

### Prerequisites

- Rust 1.70+
- Solana CLI 1.16+
- Anchor 0.28+

### Build

```bash
anchor build
```

### Deploy

```bash
anchor deploy
```

### Test

```bash
anchor test
```

## Program Structure

- `initialize`: Creates a new trader badge account
- `update_stats`: Updates trader statistics (win rate, profit, tier)

