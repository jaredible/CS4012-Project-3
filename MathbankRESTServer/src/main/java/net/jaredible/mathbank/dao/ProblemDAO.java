package net.jaredible.mathbank.dao;

import java.util.List;

import net.jaredible.mathbank.model.Problem;

public interface ProblemDAO {

	public List<Problem> get();

	public Problem get(int id);

	public Problem insert(Problem problem);

	public Problem update(Problem problem);

	public void delete(int id);

}
