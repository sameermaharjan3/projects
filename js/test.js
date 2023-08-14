/*jshint esversion: 6  */
(function (){
    "use strict";

    // Opening account with account number 123 for testing
    let testAccount = new Account(123);
    describe("Bank Accounts", function() {

        context("Opening Account", function() {

            it("Balance should be 0 at the beginning", function() {
                assert.equal(testAccount.getBalance(), 0);
            });

            it("Deposited $1000 in the account to show the balance", function() {
                testAccount.deposit(1000);
                assert.equal(testAccount.getBalance(), 1000);
            });

            it("Withrew $250 from the account, left balance should be 750", function() {
                testAccount.withdraw(250);
                assert.equal(testAccount.getBalance(), 750);
            });

            it("Checking Account number (expected: 123)", function() {
                assert.equal(testAccount.getNumber(), 123);
            });

            it("Account Details {Account : 123 balance : $750}", function() {
                assert.equal(testAccount.toString(), 'Account 123: balance 750');
            });

        });

        // Opening savings account with same account
        const testSavings = new SavingsAccount("AX1001");
        context("Savings Account Created", function() {
            it("Saving's Account created with $2000 balance ", function() {
                testSavings.deposit(2000);
                assert.equal(testSavings.getBalance(), 2000);
            });

            it("2.5% interest added to the account to the balance ", function() {
                testSavings.setInterest(2.5);
                assert.equal(testSavings.getInterest(), 2.5);
            });

            it("Saving Account details : {Saving Account : AX1001 balance 2000 interest: 2.5}", function() {
                assert.equal(testSavings.toString(), 'Saving Account : AX1001 balance 2000 interest: 2.5');
            });

        });

        // Opening checking account with same account
        const testCheckings = new CheckingAccount("AX1002");
        context("Checkings Account Created", function() {
            it("Saving's Account created with $500 balance ", function() {
                testCheckings.deposit(500);
                assert.equal(testCheckings.getBalance(), 500);
            });

            it("Checked balance after withdrawing $50 from the account (Expected: 450) ", function() {
                testCheckings.withdraw(50);
                assert.equal(testCheckings.getBalance(), 450);
            });



            it("Trying to withdraw $1000 -> Expected error as withdraw amount is greater than overdraft limit", function() {
                testCheckings.withdraw(500);
                assert.equal(testCheckings.getBalance(), 500);
            });

            it("Checked balance after withdrawing $500 from the account(Expected balance: -50 as overdraft limit is 100)", function() {
                testCheckings.setOverDraftLimit(100);
                const status = testCheckings.withdraw(500);
                assert.equal(status, 'Checking Account : AX1002 balance: -50 Overdraft limit: 100');
            });
        });

        const testBanking = new Bank();
        context("Bank Class Testing", function() {
            it("No account opened yet in the bank ", function() {
                assert.equal(testBanking.accountReport(), '');
            });

            it("Added three accounts: Account, Saving and Checking", function() {
                testBanking.addAccount(testAccount);
                testBanking.addSavingsAccount(2.5,testSavings);
                testBanking.addCheckingAccount(100,testCheckings);
                const expected = "Account 123: balance 750\nSaving Account : AX1001 balance 2000 interest: 2.5\nChecking Account : AX1002 balance: -50 Overdraft limit: 100\n";
                assert.equal(testBanking.accountReport(), expected);
            });

            it("Closed account with account number : 123 ", function() {
                testBanking.closeAccount(123);
                const expected = "Saving Account : AX1001 balance 2000 interest: 2.5\nChecking Account : AX1002 balance: -50 Overdraft limit: 100\n";
                assert.equal(testBanking.accountReport(), expected);
            });

            it("End of Month report -> Interest added on SavingsAccount and Warned for low balance on CheckingAccount ", function() {
                const expected = "Interest added on SavingsAccount :AX1001 balance:2050 interest: 2.5\nWarning, low balance CheckingAccount :AX1002 balance: -50 overdraft limit: 100\n";
                assert.equal(testBanking.endOfMonth(), expected);
            });
        });
/*        const sav = b1.addAccount(s1);
        const che = b1.addAccount(c1);
        console.log(che + " " + sav);
        console.log(b1.accountReport());
        console.log(b1.endOfMonth());*/
    });


}());