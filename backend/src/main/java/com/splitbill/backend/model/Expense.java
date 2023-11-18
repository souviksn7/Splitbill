package com.splitbill.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "expenses")
public class Expense {
    // Properties with Column name
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long expenseId;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    private float amount;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payer_id")
//    @JsonIgnore
    private User payer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "adder_id")
    private User addedBy;

    @OneToMany(mappedBy = "expense", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<SplitExpensesAmongUsers> splitExpensesAmongUsers = new HashSet<>();


//amount distribution

//    @ManyToMany
//    @JoinTable(
//            joinColumns = @JoinColumn(name = "expense_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id")
//    )
//    private Set<User> splitAmongUsers = new HashSet<>() ;

//    @Column(name = "amount_distribution")
//    private Map<User, Integer> amountDistribution = new HashMap<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id")
//    @JsonIgnore
    private Group group;

    @Column(name = "date")
    private Date date;

    @OneToMany(mappedBy = "expense",fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Comment>comments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "expense", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private  Set<Transaction>transactions;

    // getter and setter methods

    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }
}
