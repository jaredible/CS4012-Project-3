package net.jaredible.mathbank.dao;

import java.util.List;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import net.jaredible.mathbank.model.Problem;

@Repository
public class ProblemDAOImpl implements ProblemDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	@Transactional
	@SuppressWarnings("unchecked")
	public List<Problem> get() {
		Session session = sessionFactory.getCurrentSession();
		CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
		CriteriaQuery<Problem> criteriaQuery = criteriaBuilder.createQuery(Problem.class);
		Root<Problem> from = criteriaQuery.from(Problem.class);
		criteriaQuery.select(from);
		criteriaQuery.orderBy(criteriaBuilder.desc(from.get("id")));
		Query query = session.createQuery(criteriaQuery);
		return query.getResultList();
	}

	@Override
	@Transactional
	public Problem get(int id) {
		Session session = sessionFactory.getCurrentSession();
		return session.get(Problem.class, id);
	}

	@Override
	@Transactional
	public Problem insert(Problem problem) {
		Session session = sessionFactory.getCurrentSession();
		session.save(problem);
		return problem;
	}

	@Override
	@Transactional
	public Problem update(Problem problem) {
		Session session = sessionFactory.getCurrentSession();
		session.update(problem);
		return problem;
	}

	@Override
	@Transactional
	public void delete(int id) {
		Session session = sessionFactory.getCurrentSession();
		Problem problem = session.byId(Problem.class).load(id);
		session.delete(problem);
	}

}
