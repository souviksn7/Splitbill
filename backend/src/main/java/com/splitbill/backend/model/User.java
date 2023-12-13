package com.splitbill.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User{
    // Properties with Column name
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private Integer phone;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Comment>comments;

    @OneToMany(mappedBy = "payer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Expense>payedExpenses;

    @OneToMany(mappedBy = "addedBy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Expense>addedExpenses;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private Set<Group> groups = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<SplitExpensesAmongUsers> splitExpensesAmongUsers = new HashSet<>();

//    Part of expenses

//    @ManyToMany(mappedBy = "splitAmongUsers")
//    @JsonIgnore
//    private Set<Expense> partOfExpenses;

    @OneToMany(mappedBy = "debtor",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Transaction>DebtTransactions;

    @OneToMany(mappedBy = "creditor",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Transaction>CreditTransactions;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Group> createdGroups;



    // getter and setter methods
//    public Set<Group> getGroups() {
//        return groups;
//    }
//
//    public void setGroups(Set<Group> groups) {
//        this.groups = groups;
//    }

    // add convenience method to add method


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
