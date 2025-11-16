use anchor_lang::prelude::*;

declare_id!("YourProgramIdHere1111111111111111111111111");

#[program]
pub mod hyro_analytics {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let trader_badge = &mut ctx.accounts.trader_badge;
        trader_badge.owner = ctx.accounts.owner.key();
        trader_badge.win_rate = 0.0;
        trader_badge.total_profit = 0.0;
        trader_badge.account_tier = 1;
        trader_badge.bump = ctx.bumps.trader_badge;
        msg!("Trader badge initialized for {}", ctx.accounts.owner.key());
        Ok(())
    }

    pub fn update_stats(
        ctx: Context<UpdateStats>,
        win_rate: f64,
        total_profit: f64,
        account_tier: u8,
    ) -> Result<()> {
        let trader_badge = &mut ctx.accounts.trader_badge;
        require!(
            trader_badge.owner == ctx.accounts.owner.key(),
            ErrorCode::Unauthorized
        );
        trader_badge.win_rate = win_rate;
        trader_badge.total_profit = total_profit;
        trader_badge.account_tier = account_tier;
        msg!("Stats updated: Win Rate: {}%, Profit: ${}", win_rate, total_profit);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + TraderBadge::LEN,
        seeds = [b"trader_badge", owner.key().as_ref()],
        bump
    )]
    pub trader_badge: Account<'info, TraderBadge>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateStats<'info> {
    #[account(mut, has_one = owner @ ErrorCode::Unauthorized)]
    pub trader_badge: Account<'info, TraderBadge>,
    pub owner: Signer<'info>,
}

#[account]
pub struct TraderBadge {
    pub owner: Pubkey,
    pub win_rate: f64,
    pub total_profit: f64,
    pub account_tier: u8,
    pub bump: u8,
}

impl TraderBadge {
    pub const LEN: usize = 32 + 8 + 8 + 1 + 1; // owner + win_rate + total_profit + account_tier + bump
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
}

