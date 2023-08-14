/*jshint esversion: 6  */

"use strict";

class SavingsAccount extends Account{

    /**
     * Constructor for SavingsAccount
     */

    constructor(number) {
        super(number);
        this._interest = 0.0;
    }

    /**
     * Setter for interest
     */
    setInterest(interest){
        this._interest = interest;
    }

    /**
     * Getter for interest
     */
    getInterest(){
        return this._interest;
    }

    /**
     * Add interest to the balance
     */
    addInterest(){
        super.deposit(this.getBalance() * this.getInterest()/100);
    }

    /**
     * Override toString method
     */
    toString(){
        return "Saving Account : " + this.getNumber() + " balance " + this.getBalance() + " interest: " + this.getInterest();

    }

    /**
     *Add interest on the account at the end of the month for savings account
     * **/
    endOfMonth(){
        this.addInterest();
        return "Interest added on SavingsAccount :"+this.getNumber() + " balance:" + this.getBalance() + " interest: " + this.getInterest();
    }
}

class CheckingAccount extends Account{

    /**
    * Constructor for CheckingAccount
    */
    constructor(number){
        super(number);
        this._overDraftLimit = 0.0;
    }

    /**
     *Setter for overdraft limit
     */
    setOverDraftLimit(overDraftLimit){
        this._overDraftLimit = overDraftLimit;
    }

    /**
     *Getter for overdraft Limit
     */
    getOverDraftLimit(){
        return this._overDraftLimit;
    }

    /**
     *Override withraw method
     */
    withdraw(amount){
        if (amount > this._balance){
            if(amount-this._balance > this._overDraftLimit) {
                throw Error("Overdraft limit exceeded!!!");
            }else{
                this._balance = this._balance - amount;
                return this.toString();
            }
        }else {
            super.withdraw(amount);
        }

        // return successfull message on withdraw
        return "Withdraw Successfull!!!";
    }

    /**
     *Override toString method
     */
    toString() {
        return "Checking Account : "+ this.getNumber()+" balance: "+this.getBalance()+ " Overdraft limit: "+this.getOverDraftLimit();

    }

    /**
     * Return warning message if the balance is low at the end of the month
     * **/
    endOfMonth(){
        if(this.getBalance() < 0){
            return "Warning, low balance CheckingAccount :"+this.getNumber()+" balance: "+this.getBalance()+ " overdraft limit: "+this.getOverDraftLimit();
        }else{
            return "";
        }
    }
}

class Bank{
    /**
     *Constructor for bank class
     * **/
    constructor(){
        this._account = [];
    }

    /**
     *Add account
     * **/
    addAccount(acc){
        this._account.push(acc);
        return acc.getNumber();
    }

    /**
     *Add savings account
     * **/
    addSavingsAccount(interest,acc){
        this._account.push(acc);
        return acc.getNumber();
    }

    /**
     *add checking account
     * **/
    addCheckingAccount(overdraft,acc){
        this._account.push(acc);
        return acc.getNumber();
    }

    /**
     *Close specific account
     * **/
    closeAccount(number){
       const closeAcc =  this._account.filter(a => a.getNumber() != number);
        this._account = closeAcc;
    }

    /**
     *Report that shows all the accounts detail
     * **/
    accountReport(){
        let nextNumber;
        let report = "";
        for(nextNumber in this._account){
            report = report + this._account[nextNumber].toString() + "\n";
        }
        return report;
    }

    /**
     *Go through all accounts and collect end of the month status
     * **/
    endOfMonth(){
        let collect = "";
        for(const key in this._account){
            collect += this._account[key].endOfMonth() + "\n";
        }
        return collect;
    }

}


//Unit testing for savings account
const s1 = new SavingsAccount();
s1._number = "AX1001";
s1._balance = 100;
s1.setInterest(2.5);
console.log(s1.toString());


//Unit testing for checking account
const c1 = new CheckingAccount();
c1._number = "AX1002";
c1._balance = 1000;
c1.setOverDraftLimit(100);
let withdrawAmount = c1.withdraw(1050);
console.log(withdrawAmount);

//Unit testing for bank class
const b1 = new Bank();
const sav = b1.addSavingsAccount(2.5,s1);
const che = b1.addCheckingAccount(100,c1);
console.log(che + " " + sav);
console.log(b1.accountReport());
console.log(b1.endOfMonth());